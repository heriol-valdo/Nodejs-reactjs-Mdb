const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const produitRoutes = require('./routes/produitRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express(); // Creation d'une instance d'express
const PORT = process.env.PORT || 5000; // Définittion du  port sur lequel le serveur va écouter

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/productsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Configuration des middlewares
app.use(cors()); 
app.use(bodyParser.json()); 
// Ajout des routes produits et users
app.use('/api/produits', produitRoutes); 
app.use('/api/user', userRoutes); 

// Lancement  du serveur 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});

