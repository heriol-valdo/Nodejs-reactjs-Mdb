const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ïOÖbÈ3~_Äijb¥d-ýÇ£Hf¿@xyLcP÷@'; 

const authMiddleware = (req, res, next) => {
  // Récupération du header Authorization de la requête
  const authHeader = req.headers['authorization'];

  // Vérification si le header authorization est présent
  if (!authHeader) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Extraction du token JWT à partir du header Authorization
  const token = authHeader.split(' ')[1];

  // Vérification si le token JWT est présent
  if (!token) {
      return res.status(401).json({ message: 'Access denied. Invalid token format.' });
  }

  try {
      // Vérification et décryptage du token JWT avec la clé secrète
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attribution des informations utilisateur décryptées à l'objet req pour les routes suivantes
      req.user = decoded;

      // Appel de la fonction next() pour passer au middleware ou à la route suivante
      next();
  } catch (ex) {
      // Gestion des erreurs si le token est invalide ou expiré
      res.status(400).json({ message: 'Invalid token.' });
  }
};

  
  module.exports = authMiddleware;
