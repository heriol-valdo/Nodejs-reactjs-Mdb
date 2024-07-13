import { LOGIN_USER } from '../actions/types';

// État initial du reducer
const initialState = {
  isAuthenticated: false, // Indique si l'utilisateur est authentifié ou non
  user: {},               // Contient les informations de l'utilisateur connecté
};

// Reducer qui gère les actions liées à l'utilisateur
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      // Action pour gérer la connexion de l'utilisateur
      return {
        ...state,
        isAuthenticated: !!Object.keys(action.payload).length, // Vérifie si les données de l'utilisateur ne sont pas vides pour déterminer l'authentification
        user: action.payload, // Met à jour les informations de l'utilisateur connecté
      };
    default:
      return state; // Retourne l'état inchangé si l'action n'est pas reconnue
  }
}

export default userReducer;
