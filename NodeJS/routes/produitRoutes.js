const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');
const authMiddleware = require('./authMiddleware');

// Ensemble des routes permettant d'exécuter une action précise 
router.use(authMiddleware);
router.get('/', produitController.getAllProduits);
router.post('/', produitController.createProduit);
router.get('/:id', produitController.getProduitById);
router.put('/:id', produitController.updateProduit);
router.delete('/:id', produitController.deleteProduit);

module.exports = router;
