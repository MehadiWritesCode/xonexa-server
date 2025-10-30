import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error connecting to MongoDB", err));

//  Product Schema
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  category: String,
  stock:Number,
  price: Number,
  discount: { type: Number, min: 0, max: 100, default: 0 },
  sizes: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
  },
  images: [String], 
  dateAdded: { type: Date, default: Date.now },
});

// Model
const product = mongoose.model('product', productSchema);
export default product;

