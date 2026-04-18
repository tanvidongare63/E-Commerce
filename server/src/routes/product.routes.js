const express = require("express");
const prisma = require("../prisma");
const { authRequired, adminOnly } = require("../middleware/auth");
const { productSchema } = require("../utils/validators");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search = "", category = "", minPrice, maxPrice } = req.query;
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        title: { contains: search },
        category: { contains: category },
        ...(minPrice ? { price: { gte: Number(minPrice) } } : {}),
        ...(maxPrice ? { price: { lte: Number(maxPrice) } } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) } });
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ product });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch product" });
  }
});

router.post("/", authRequired, adminOnly, async (req, res) => {
  try {
    const data = productSchema.parse(req.body);
    const product = await prisma.product.create({
      data: { ...data, imageUrl: data.imageUrl || null },
    });
    return res.status(201).json({ product });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Invalid product data", issues: error.issues });
    }
    return res.status(500).json({ message: "Failed to create product" });
  }
});

router.put("/:id", authRequired, adminOnly, async (req, res) => {
  try {
    const data = productSchema.partial().parse(req.body);
    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: { ...data, ...(data.imageUrl === "" ? { imageUrl: null } : {}) },
    });
    return res.json({ product });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Invalid product data", issues: error.issues });
    }
    return res.status(500).json({ message: "Failed to update product" });
  }
});

router.delete("/:id", authRequired, adminOnly, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
