import React, { useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addUser} from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Card,  CardContent, TextField, Button, makeStyles } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';


// Liste des styles du formulaire utilisateur
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
  title: {
    color: '#7878bd',
    fontSize: 21,
    marginLeft: '6rem'
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

const UserForm = () => {
  //Initialisation des variables du programme
  const [isFormValid, setIsFormValid] = useState(false);
  const classes = useStyles();
  const { addToast } = useToasts();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

 //Permet d'envoyer des actions au store Redux pour déclencher des modifications de l'état global
  const dispatch = useDispatch();

  //Permet d'utiliser la navigation
  const navigate = useNavigate();

  // Permet de mettre à jour les champs du formulaire lors de la saisie de l'utilisateur
  const handleChange = e => {
    const { name, value } = e.target;
    //setUser({ ...user, [name]: value });
    setUser(user => ({ ...user, [name]: value }));
  };

   //S'exécute après chaque modification du composant.
   useEffect(() => {
    // Vérifier si tous les champs sont remplis
    setIsFormValid(user.name !== '' && user.password !== '' && user.email !== '');
  }, [user.name, user.password, user.email, setIsFormValid]);
  


    // Envoie du  formulaire
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addUser(user))
    .then(response => {
        //Affiche un message  de succès après la bonne éxcution de l'action/requette
      addToast('Add user successful', {  appearance: 'success',
        autoDismiss: true, 
        autoDismissTimeout: 3000, 
      });
      // Permet la navigation vers la page de Connection
      navigate('/login'); 
    })
    .catch(error => {
        //Affiche un message contenant l'erreur survenu lors de l'excution de l'action/requette
      addToast('Add failed: '+error.message, {  
        appearance: 'error',
        autoDismiss: true, 
        autoDismissTimeout: 3000, 
      });
    });
  };

  return (
    <Container>
      <Card className={classes.card}>
        <div className={classes.header}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className={classes.icon}>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
        </svg>
         <Button className={classes.title} variant="text" >Add User</Button>
        </div>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField 
              name="name" 
              label="Name" 
              value={user.name} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              className={classes.input}
            />
            <TextField 
              name="email" 
              label="Email" 
              value={user.email} 
              type="email" 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              className={classes.input}
            />
            <TextField 
              name="password" 
              label="Password" 
              value={user.password} 
              onChange={handleChange} 
              type="text" 
              fullWidth 
              margin="normal" 
              className={classes.input}
            />
           
            <Button type="submit" variant="contained" disabled={!isFormValid}  className={classes.button}>SIGN UP</Button>
          </form>

          <Button  component={Link} to="/login" variant="contained"   className={classes.buttonback}>LOGIN</Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserForm;
