const mongoose = require('mongoose');
const Product = require('../models/Product');

async function clearDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/product-matcher');
    console.log('✅ Connected to MongoDB');

    // Delete ALL products to reseed with new CLIP embeddings
    const result = await Product.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} products`);
    
    console.log('✅ Database cleared - ready for reseeding with CLIP model');
    console.log('Run: node scripts/seedProducts.js');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearDatabase();
