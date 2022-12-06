const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  img: {
    type: String,
    required: [true, 'Image must be provided'],
  },
  name: {
    type: String,
    required: [true, 'Product name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'Product price must be provided'],
  },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  createAt: { type: Date, default: Date.now() },
  company: {
    type: String,
/*     enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported',
    }, */
  },
});

productSchema.virtual('url').get(function() {
  return "/" + this._id;
});

module.exports = mongoose.model('Product', productSchema);
