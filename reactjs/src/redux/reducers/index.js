import { combineReducers } from 'redux';
import produitReducer from './produitReducer';
import userReducer from './userReducer';

// Listes des reducers
const rootReducer = combineReducers({
  produits: produitReducer,
  user:userReducer,
});

export default rootReducer;
