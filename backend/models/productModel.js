// models/productModel.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    // required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    // required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  shipping: {
    type: Boolean,
    // required: true
  },
  image: {
    type: String, // URL or path to the image
    required: true
  }
}, { timestamps: true });

productSchema.pre('validate', function(next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
