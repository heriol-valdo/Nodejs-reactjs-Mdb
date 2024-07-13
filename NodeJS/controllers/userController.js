const User = require('../models/user');
const jwt = require('jsonwebtoken');


// La clé secrète pour crypter le token
const JWT_SECRET = 'ïOÖbÈ3~_Äijb¥d-ýÇ£Hf¿@xyLcP÷@';

// Action permettant de récupérer les informations d'un utilisateur grâce à son id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // Vérification si l'utilisateur existe 
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while retrieving the user',
      error: error.message,
    });
  }
};

// Action qui permet la création d'un nouvel utilisateur
  exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Vérification si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already in use' });
      }
  
      // Création du nouvel utilisateur
      const user = new User({ name, email, password });
      await user.save();
  
      res.status(201).send(user);
    } catch (error) {
      // Gestion des erreurs
      res.status(500).send({
        message: 'An error occurred while creating the user',
        error: error.message,
      });
    }
  };


  // Action qui permet la connection d'un utilisateur
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // Vérification si l'utilisateur existe 
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    // Vérification du mot de passe
    if (!user || !await user.matchPassword(password)) {
      return res.status(400).send({ message: 'Invalid email or password is incorrect' });
    }

    //  Création du token 
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};


