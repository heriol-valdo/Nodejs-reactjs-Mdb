import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; 
import rootReducer from './reducers'; 

const initialState = {}; // État initial vide

const middleware = [thunk]; // Middleware thunk à utiliser

// Configuration de  redux  pour le développement
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Création du store redux 
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
