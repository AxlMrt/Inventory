const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  type: { type: String, required: true },
  damage: { type: Number, required: true },
  price: { type: Number, required: true },
});

WeaponSchema.virtual('url').get(function () {
  return `/catalog/weapon/${this._id}`;
});

module.exports = mongoose.model('weapon', WeaponSchema);
