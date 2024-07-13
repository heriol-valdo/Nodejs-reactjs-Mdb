import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { LOGIN_USER, ADD_USER, GET_USER } from './types';

const apiUrl = 'http://localhost:5000/api/user';

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

// Action pour ajouter un utilisateur
export const addUser = user => async dispatch => {
  try {
    const res = await api.post('/', user);
    dispatch({
      type: ADD_USER,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.error('Add', error);
    throw error.response.data;
  }
};

// Action pour récupérer un utilisateur par ID
export const getUser = id => async dispatch => {
  try {
    const res = await api.get(`/${id}`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.error('Get', error);
    throw error.response.data;
  }
};

// Action pour connecter un utilisateur
export const loginUser = user => async dispatch => {
  try {
    const res = await api.post('/login', user);
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (error) {
    console.error('Login error', error);
    throw error.response.data;
  }
};

// Action pour déconnecter un utilisateur
export const logout = () => async dispatch => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({
      type: LOGIN_USER,
      payload: {},
    });
    return true;
  } catch (error) {
    console.error('Logout error', error);
    throw error.response.data;
  }
};

// Fonction pour récupérer l'utilisateur actuel depuis le localStorage
export const getCurrentUser = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'));
  } else {
    return false;
  }
};

// Fonction pour récupérer le token depuis le localStorage
export const getToken = () => {
  if (localStorage.getItem('token')) {
    return localStorage.getItem('token');
  } else {
    return false;
  }
};

// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp > Date.now() / 1000;
    if (!exp) {
      logout();
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};



