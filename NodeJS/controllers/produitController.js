const Produit = require('../models/produit');


// Action permettant de récupérer les informations des produits
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while findAll  produit',
      error: error.message,
    });
  }
};

// Action permettant la création d'un produit
exports.createProduit = async (req, res) => {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(201).send(produit);
  } catch (error) {
      res.status(500).send({
      message: 'An error occurred while creating the produit',
      error: error.message,
    });
  }
};

// Action permettant de récupérer les informations d'un produit grâce à son id
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);

      // Vérification si le produit existe 
    if (!produit) {
      return res.status(400).send({ message: 'The produit Select does not exist' });
    }
    res.send(produit);
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while find the produit select',
      error: error.message,
    });
  }
};


// Action permettant la modification  des informations d'un produit grâce à son id
exports.updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!produit) {
      return res.status(400).send({ message: 'The produit Select does not exist' });
    }
    res.send(produit);
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred when update the produit select',
      error: error.message,
    });
  }
};

// Action permettant la suppression  des informations d'un produit grâce à son id
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) {
      return res.status(400).send({ message: 'The produit Select does not exist' });
    }
    res.send(produit);
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred when delete the produit select',
      error: error.message,
    });
  }
};
