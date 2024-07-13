import { FETCH_PRODUITS, ADD_PRODUIT, GET_PRODUIT, UPDATE_PRODUIT, DELETE_PRODUIT } from '../actions/types';

// État initial du reducer
const initialState = {
  items: [], // Liste des produits
  item: {},  // Produit individuel
};

// Reducer qui gère les actions liées aux produits
const produitReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUITS:
      // Action pour récupérer tous les produits
      return {
        ...state,
        items: action.payload, // Met à jour la liste des produits avec les données reçues
      };
    case ADD_PRODUIT:
      // Action pour ajouter un nouveau produit
      return {
        ...state,
        items: [...state.items, action.payload], // Ajoute le nouveau produit à la liste existante
      };
    case GET_PRODUIT:
      // Action pour récupérer un produit spécifique
      return {
        ...state,
        item: action.payload, // Met à jour le produit individuel avec les données reçues
      };
    case UPDATE_PRODUIT:
      // Action pour mettre à jour un produit existant
      return {
        ...state,
        items: state.items.map(item => 
          item._id === action.payload._id ? action.payload : item
        ), // Met à jour le produit dans la liste en remplaçant l'ancien par le nouveau
      };
    case DELETE_PRODUIT:
      // Action pour supprimer un produit
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload), // Supprime le produit de la liste
      };
    default:
      return state; // Retourne l'état inchangé si l'action n'est pas reconnue
  }
}

export default produitReducer;
