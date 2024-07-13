import axios from 'axios';
import { FETCH_PRODUITS, ADD_PRODUIT, GET_PRODUIT, UPDATE_PRODUIT, DELETE_PRODUIT } from './types';

// URL de base de l'API
const apiUrl = 'http://localhost:5000/api/produits';

// Création d'une instance d'axios
const api = axios.create({
  baseURL: apiUrl,
});

// Intercepteur pour ajouter le token aux en-têtes des requêtes
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Action pour récupérer tous les produits
export const fetchProduits = () => async dispatch => {
  try {
    const res = await api.get('/');
    dispatch({
      type: FETCH_PRODUITS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.error('fetch error', error);
    //throw error.response.data; 
  }
};

// Action pour ajouter un produit
export const addProduit = produit => async dispatch => {
  try {
    const res = await api.post('/', produit);
    dispatch({
      type: ADD_PRODUIT,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.error('fetch error', error);
    throw error.response.data; 
  }
};

// Action pour récupérer un produit par ID
export const getProduit = id => async dispatch => {
  try {
    const res = await api.get(`/${id}`);
    dispatch({
      type: GET_PRODUIT,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.error('fetch error', error);
    throw error.response.data; 
  }
};

// Action pour mettre à jour un produit
export const updateProduit = (id, produit) => async dispatch => {
  try {
    const res = await api.put(`/${id}`, produit);
    dispatch({
      type: UPDATE_PRODUIT,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.error('fetch error', error);
    throw error.response.data; 
  }
};

// Action pour supprimer un produit
export const deleteProduit = id => async dispatch => {
  try {
    const res = await api.delete(`/${id}`);
    dispatch({
      // Indique quelle action doit être exécutée pour mettre à jour le store
      type: DELETE_PRODUIT,
      //Les données associées à l'action, utilisées pour effectuer la mise à jour de l'état global
      payload: id, 
    });
    
    return res.data;
  } catch (error) {
    console.error('fetch error', error);
    throw error.response.data; 
  }
};
