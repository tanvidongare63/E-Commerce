const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

const productSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(10).max(2000),
  imageUrl: z.string().url().optional().or(z.literal("")),
  category: z.string().min(2).max(80),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  isActive: z.boolean().optional(),
});

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().min(1).max(100),
      }),
    )
    .min(1),
});

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  checkoutSchema,
};
