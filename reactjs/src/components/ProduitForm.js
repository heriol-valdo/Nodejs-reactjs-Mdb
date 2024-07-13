import React, { useState, useEffect,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduit, getProduit, updateProduit } from '../redux/actions/produitActions';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserInfo } from './UserInfo';
import { Container, Card,  CardContent, TextField, Button, makeStyles,Select, MenuItem, InputLabel } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';


// Liste des styles du formulaire produit
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    boxShadow: '10px 10px 64px 0px rgba(180, 180, 207, 0.75)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
    color: '#7878bd',
  },
  title: {
    color: '#7878bd',
    fontSize: 21,
    marginLeft: '4rem'
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginLeft: '5rem',
    width:'120px',
    backgroundColor: '#7878bd',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5f5f9c',
    },
  },
  buttonback: {
    marginLeft: '5rem',
    marginTop:'20px',
    width:'120px',
    backgroundColor: 'red',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5f5fc',
    },
  },
}));

const ProduitForm = () => {
  //Initialisation des variables du programme
  const [isFormValid, setIsFormValid] = useState(false);
  const classes = useStyles();
  const  [title, setTitle] = useState();
  const { addToast } = useToasts();
  const initialProduitState = useMemo(() => ({
    name: '',
    type: '',
    price: 0,
    rating: 0,
    warranty_years: 0,
    available: true,
  }), []);
  const [produit, setProduit] = useState(initialProduitState);

  //Permet d'envoyer des actions au store Redux pour déclencher des modifications de l'état global
  const dispatch = useDispatch();

  //Permet d'utiliser la navigation
  const navigate = useNavigate();

  // Récuperation des paramètres de la requette 
  const { id } = useParams();
  const { ed } = useParams();

  //Permet d'accéder aux données stockées dans le store Redux
  const existingProduit = useSelector(state => state.produits.item);

  //S'exécute après chaque modification du composant.
  useEffect(() => {
    if (id) {
      // Recuperation du produit si l'id existe
      dispatch(getProduit(id))
      .catch(error => {
        //Affiche un message contenant l'erreur survenu lors de l'excution de l'action/requette
        addToast('fetch failed :  '+ error.message, {  
          appearance: 'error',
          autoDismiss: true, 
          autoDismissTimeout: 3000, 
        });
      });
    } else {
      setProduit(initialProduitState);
    }

    // Modification tu  titre du formulaire en fonction de l'action ADD/UPDATE
    if(ed==='1'){
      setTitle("ADD PRODUIT");
    }else{
      setTitle("UPDATE PRODUIT");
    }
  }, [id,ed,initialProduitState,addToast, dispatch]);

  useEffect(() => {
    // Remplissage du formulaire s'il y'a des données dans l'id et le store redux
    if (id && existingProduit) {
      setProduit(existingProduit);
    }
  }, [existingProduit, id]);


     //S'exécute après chaque modification du composant.
     useEffect(() => {
      // Vérifier si tous les champs sont remplis
      setIsFormValid(produit.name !== '' && produit.type !== '' && produit.price !== '' && produit.rating !== '' && produit.warranty_years !== '' && produit.available !== '');
    }, [produit.name, produit.type,produit.price,produit.rating,produit.warranty_years,produit.available, setIsFormValid]);

  // Permet de mettre à jour les champs du formulaire lors de la saisie de l'utilisateur
  const handleChange = e => {
    const { name, value } = e.target;
    setProduit({ ...produit, [name]: value });
  };


   // Gestion du changement pour le menu déroulant
   const handleAvailableChange = (e) => {
    setProduit({ ...produit, available: e.target.value === 'true' });
  };

  // Envoie du  formulaire
  const handleSubmit = e => {
    e.preventDefault();
    // Mettre à jour le produit ou l'insérer  en fonction de la valeur de l'id  
    if (id) {
      dispatch(updateProduit(id, produit))
      .then(response => {
          //Affiche un message  de succès après la bonne éxcution de l'action/requette
        addToast("Successful produit modification", { 
          appearance: 'success',
          autoDismiss: true, 
          autoDismissTimeout: 3000, 
        });
      })
      .catch(error => {
          //Affiche un message contenant l'erreur survenu lors de l'excution de l'action/requette
        addToast('Update failed :  '+ error.message, {  
          appearance: 'error',
          autoDismiss: true, 
          autoDismissTimeout: 3000, 
        });
      });
    } else {
      dispatch(addProduit(produit))
      .then(response => {
          //Affiche un message  de succès après la bonne éxcution de l'action/requette
        addToast("Successful Add produit ", { 
          appearance: 'success',
          autoDismiss: true, 
          autoDismissTimeout: 3000, 
        });
      })
      .catch(error => {
         //Affiche un message contenant l'erreur survenu lors de l'excution de l'action/requette
        addToast('Add failed :  '+ error.message, {  
          appearance: 'error',
          autoDismiss: true, 
          autoDismissTimeout: 3000, 
        });
      });
    }
    navigate('/');
  };

  return (
    <Container>
      <UserInfo></UserInfo>
      <Card className={classes.card}>
        <div className={classes.header}>
         <Button className={classes.title} variant="text" >{title}</Button>
        </div>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField 
              name="name" 
              label="Name" 
              value={produit.name} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              className={classes.input}
            />
            <TextField 
              name="type" 
              label="Type" 
              value={produit.type} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              className={classes.input}
            />
            <TextField 
              name="price" 
              label="Price" 
              value={produit.price} 
              onChange={handleChange} 
              type="number" 
              fullWidth 
              margin="normal" 
              className={classes.input}
            />
            <TextField 
              name="rating" 
              label="Rating" 
              value={produit.rating} 
              onChange={handleChange} 
              type="number" 
              fullWidth 
              margin="normal" 
              className={classes.input}
            />
            <TextField 
              name="warranty_years" 
              label="Warranty Years" 
              value={produit.warranty_years} 
              onChange={handleChange} 
              type="number" 
              fullWidth 
              margin="normal" 
              className={classes.input}
            />
             <InputLabel id="available-label">Available</InputLabel>
            <Select
              labelId="available-label"
              id="available"
              name="available"
              value={produit.available ? 'true' : 'false'}
              onChange={handleAvailableChange}
              fullWidth
              className={classes.input}
            >
              
              <MenuItem value={'true'}>Yes</MenuItem>
              <MenuItem value={'false'}>False</MenuItem>
            </Select>
            <Button type="submit" variant="contained" disabled={!isFormValid} className={classes.button}>SAVE</Button>
          </form>

          <Button  component={Link} to="/" variant="contained" color="error"  className={classes.buttonback}>BACK</Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProduitForm;
