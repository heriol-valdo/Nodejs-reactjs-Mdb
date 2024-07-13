const mongoose = require('mongoose');

//creation du shema
const produitSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  rating: Number,
  warranty_years: Number,
  available: Boolean,
});

module.exports = mongoose.model('Produit', produitSchema);
