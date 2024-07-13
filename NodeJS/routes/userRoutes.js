const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('./authMiddleware');

//Ensemble des routes permettant d'exécuter une action précise.
router.get('/:id',authMiddleware, userController.getUserById);
router.post('/', userController.createUser);
router.post('/login',userController.loginUser);

module.exports = router;
