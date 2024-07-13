import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProduitList from './components/ProduitList';
import ProduitForm from './components/ProduitForm';
import UserForm from './components/UserForm';
import UserLogin from './components/UserLogin';

// Définition des routes de l'application
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<ProduitList />} />
          <Route path="/produit/:id/:ed" element={<ProduitForm />} />
          <Route path="/add/:ed" element={<ProduitForm />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/addUser" element={<UserForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

