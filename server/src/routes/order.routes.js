const express = require("express");
const prisma = require("../prisma");
const { authRequired, adminOnly } = require("../middleware/auth");
const { checkoutSchema } = require("../utils/validators");

const router = express.Router();

const TAX_RATE = 0.1;
const SHIPPING_FEE = 7.5;

router.post("/checkout", authRequired, async (req, res) => {
  try {
    const { items } = checkoutSchema.parse(req.body);
    const productIds = items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    if (products.length !== items.length) {
      return res.status(400).json({ message: "Some products are unavailable" });
    }

    const map = new Map(products.map((p) => [p.id, p]));
    for (const item of items) {
      const product = map.get(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product?.title || "item"}` });
      }
    }

    const subtotal = items.reduce((sum, item) => {
      const product = map.get(item.productId);
      return sum + product.price * item.quantity;
    }, 0);
    const tax = Number((subtotal * TAX_RATE).toFixed(2));
    const shipping = subtotal > 100 ? 0 : SHIPPING_FEE;
    const total = Number((subtotal + tax + shipping).toFixed(2));

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          userId: req.user.id,
          subtotal,
          tax,
          shipping,
          total,
          orderItems: {
            create: items.map((item) => {
              const product = map.get(item.productId);
              return {
                productId: product.id,
                title: product.title,
                price: product.price,
                quantity: item.quantity,
              };
            }),
          },
        },
        include: { orderItems: true },
      });

      await Promise.all(
        items.map((item) => {
          const product = map.get(item.productId);
          return tx.product.update({
            where: { id: product.id },
            data: { stock: product.stock - item.quantity },
          });
        }),
      );

      return created;
    });

    return res.status(201).json({ order });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Invalid checkout data", issues: error.issues });
    }
    return res.status(500).json({ message: "Checkout failed" });
  }
});

router.get("/my", authRequired, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { orderItems: true },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch order history" });
  }
});

router.get("/", authRequired, adminOnly, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: true,
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch all orders" });
  }
});

module.exports = router;
