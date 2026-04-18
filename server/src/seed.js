require("dotenv").config();
const bcrypt = require("bcryptjs");
const prisma = require("./prisma");

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@store.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: "ADMIN", name: "Store Admin" },
    create: {
      name: "Store Admin",
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
    },
  });

  const products = [
    { title: "Wireless Headphones", description: "Noise-cancelling over-ear headphones with immersive sound.", category: "Electronics", price: 89.99, stock: 35, imageUrl: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?q=80&w=1000&auto=format&fit=crop" },
    { title: "Smart Watch", description: "Track fitness, notifications, and health metrics all day.", category: "Electronics", price: 129.0, stock: 20, imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop" },
    { title: "Bluetooth Speaker", description: "Portable speaker with deep bass and 12-hour battery life.", category: "Electronics", price: 59.99, stock: 42, imageUrl: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1000&auto=format&fit=crop" },
    { title: "Minimalist Backpack", description: "Water-resistant backpack perfect for work and travel.", category: "Accessories", price: 49.5, stock: 50, imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1000&auto=format&fit=crop" },
    { title: "Leather Wallet", description: "Slim leather wallet with RFID protection and multiple slots.", category: "Accessories", price: 24.99, stock: 70, imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop" },
    { title: "Running Shoes", description: "Breathable running shoes designed for comfort and support.", category: "Footwear", price: 74.99, stock: 30, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" },
    { title: "Cotton T-Shirt", description: "Soft and durable unisex t-shirt for daily wear.", category: "Clothing", price: 19.99, stock: 100, imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop" },
    { title: "Denim Jacket", description: "Classic denim jacket with modern fit.", category: "Clothing", price: 64.99, stock: 26, imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop" },
    { title: "Organic Green Tea", description: "Refreshing organic green tea leaves for daily wellness.", category: "Groceries", price: 12.5, stock: 90, imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop" },
    { title: "Arabica Coffee Beans", description: "Medium roast whole beans with rich aroma and flavor.", category: "Groceries", price: 15.75, stock: 65, imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop" },
    { title: "Office Chair", description: "Ergonomic office chair with lumbar support and mesh back.", category: "Furniture", price: 149.99, stock: 18, imageUrl: "https://images.unsplash.com/photo-1505843490701-5be5d1b4789a?q=80&w=1000&auto=format&fit=crop" },
    { title: "Wooden Study Desk", description: "Spacious wooden desk for work, gaming, or study setup.", category: "Furniture", price: 199.99, stock: 12, imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000&auto=format&fit=crop" },
    { title: "Yoga Mat", description: "Non-slip yoga mat with extra cushioning for home workouts.", category: "Sports", price: 29.99, stock: 55, imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop" },
    { title: "Cricket Bat", description: "Lightweight English willow cricket bat for all-round play.", category: "Sports", price: 89.0, stock: 16, imageUrl: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=1000&auto=format&fit=crop" },
    { title: "Facial Cleanser", description: "Gentle foaming cleanser suitable for all skin types.", category: "Beauty", price: 14.99, stock: 80, imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop" },
    { title: "Matte Lipstick", description: "Long-lasting matte lipstick with rich pigment.", category: "Beauty", price: 9.99, stock: 75, imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop" },
    { title: "The Art of Focus", description: "A practical guide to deep work and mindful productivity.", category: "Books", price: 18.99, stock: 45, imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop" },
    { title: "Kids Story Collection", description: "Illustrated bedtime stories for children aged 5-10.", category: "Books", price: 13.49, stock: 60, imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop" },
    { title: "Building Blocks Set", description: "Creative building blocks toy set for children.", category: "Toys", price: 34.99, stock: 38, imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop" },
    { title: "Remote Control Car", description: "Fast and durable RC car with rechargeable battery.", category: "Toys", price: 44.99, stock: 27, imageUrl: "https://images.unsplash.com/photo-1558877385-81a1c7f9c421?q=80&w=1000&auto=format&fit=crop" },
    { title: "Stainless Water Bottle", description: "Insulated bottle that keeps drinks cold or hot for hours.", category: "Home & Kitchen", price: 21.99, stock: 85, imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop" },
  ];

  for (const product of products) {
    const exists = await prisma.product.findFirst({ where: { title: product.title } });
    if (!exists) {
      await prisma.product.create({ data: product });
    }
  }

  console.log("Seed completed. Admin:", adminEmail);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
