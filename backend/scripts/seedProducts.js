const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { getImageEmbedding } = require('../services/ml-service');

const PRODUCTS = [
  { name: 'MacBook Pro 16 inch', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800' },
  { name: 'iPhone 15 Pro', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1592286927505-4fd4ec09f7f2?w=800' },
  { name: 'Sony Headphones', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800' },
  { name: 'iPad Pro', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' },
  { name: 'Apple Watch', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800' },
  { name: 'Canon Camera', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1606980702973-7a87e21bc314?w=800' },
  { name: 'Samsung TV', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800' },
  { name: 'Dell Laptop', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800' },
  { name: 'Bose Speaker', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800' },
  { name: 'Logitech Mouse', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800' },
  { name: 'Gaming Keyboard', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800' },
  { name: 'Samsung Phone', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800' },
  { name: 'Nike Air Max', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' },
  { name: 'Adidas Shoes', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800' },
  { name: 'Converse Sneakers', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800' },
  { name: 'Oxford Shoes', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800' },
  { name: 'Canvas Sneakers', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800' },
  { name: 'Leather Boots', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800' },
  { name: 'Puma Shoes', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800' },
  { name: 'Timberland Boots', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800' },
  { name: 'Vans Slip-On', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800' },
  { name: 'New Balance', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800' },
  { name: 'Denim Jacket', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800' },
  { name: 'White T-Shirt', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800' },
  { name: 'Black Hoodie', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800' },
  { name: 'Blue Jeans', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800' },
  { name: 'Leather Jacket', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800' },
  { name: 'Summer Dress', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800' },
  { name: 'Wool Sweater', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800' },
  { name: 'Blazer Jacket', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800' },
  { name: 'Office Chair', category: 'Home', image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800' },
  { name: 'Wooden Desk', category: 'Home', image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800' },
  { name: 'Floor Lamp', category: 'Home', image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800' },
  { name: 'Plant Pot', category: 'Home', image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800' },
  { name: 'Wall Mirror', category: 'Home', image_url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800' },
  { name: 'Bookshelf', category: 'Home', image_url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800' },
  { name: 'Throw Pillow', category: 'Home', image_url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800' },
  { name: 'Area Rug', category: 'Home', image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' },
  { name: 'Backpack', category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800' },
  { name: 'Sunglasses', category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800' },
  { name: 'Wrist Watch', category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800' },
  { name: 'Leather Wallet', category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800' },
  { name: 'Baseball Cap', category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800' },
  { name: 'Leather Belt', category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1624222247344-550fb60583e2?w=800' },
  { name: 'Tote Bag', category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800' },
  { name: 'Scarf', category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800' },
  { name: 'Crossbody Bag', category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800' },
  { name: 'Duffel Bag', category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800' },
  { name: 'Yoga Mat', category: 'Sports', image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800' },
  { name: 'Dumbbells', category: 'Sports', image_url: 'https://images.unsplash.com/photo-1591940742878-13aba5b7a415?w=800' },
  { name: 'Mountain Bike', category: 'Sports', image_url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800' },
  { name: 'Tennis Racket', category: 'Sports', image_url: 'https://images.unsplash.com/photo-1617083277907-4ee6c0d2a4e9?w=800' },
  { name: 'Basketball', category: 'Sports', image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800' },
  { name: 'Water Bottle', category: 'Sports', image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800' },
  { name: 'Coffee Mug', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=800' },
  { name: 'Dinner Plates', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800' },
  { name: 'Wine Glasses', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800' },
  { name: 'Cooking Pan', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800' },
  { name: 'Knife Set', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800' },
  { name: 'Blender', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800' }
];

async function seedDatabase() {
  console.log('🌱 Database Seeding\n');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('🗑️  Clearing database...');
    await Product.deleteMany({});
    console.log('✅ Database cleared\n');

    console.log(`🌱 Seeding ${PRODUCTS.length} products...\n`);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < PRODUCTS.length; i++) {
      const p = PRODUCTS[i];
      try {
        console.log(`[${i + 1}/${PRODUCTS.length}] ${p.name}`);
        
        const embedding = await getImageEmbedding(p.image_url);
        
        await Product.create({
          name: p.name,
          category: p.category,
          image_url: p.image_url,
          embedding: embedding
        });
        
        console.log(`✅ Saved | ${p.category}\n`);
        success++;
        
        await new Promise(r => setTimeout(r, 300));
      } catch (error) {
        console.error(`❌ Failed: ${error.message}\n`);
        failed++;
      }
    }

    console.log('═'.repeat(50));
    console.log(`✅ Success: ${success}`);
    console.log(`❌ Failed: ${failed}`);
    console.log('═'.repeat(50));

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Done');
  }
}

seedDatabase();
