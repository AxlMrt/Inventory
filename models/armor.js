const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArmorSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  type: { type: String, required: true },
  protection: { type: Number, required: true },
  price: { type: Number, required: true },
});

ArmorSchema.virtual('url').get(function () {
  return `/catalog/armor/${this._id}`;
});

module.exports = mongoose.model('armor', ArmorSchema);
