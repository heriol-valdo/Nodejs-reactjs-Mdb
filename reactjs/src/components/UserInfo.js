import { logout,getUser,getCurrentUser,isAuthenticated} from '../redux/actions/userActions';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { Button, Container,makeStyles } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';

// Liste des styles pour les informations de l'utilisateur connecter
const useStyles = makeStyles((theme) => ({
    containt: {
        width: "100%",
        marginBottom: "50px",
        padding: theme.spacing(2),
        boxShadow: '0px 0px 20px 0px rgba(180, 180, 207, 0.75)',
        display: 'flex',  
        alignItems: 'center', 
        justifyContent: 'space-between',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
    },
    buttonback: {
      width:'120px',
      backgroundColor: 'red',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#5f5f',
      },
    },

    
  }));
export const UserInfo = () => {
    //Initialisation des variables du programme
    const classes = useStyles();
    const [name, setName] = useState('Name');
    const { addToast } = useToasts();

     //Permet d'envoyer des actions au store Redux pour déclencher des modifications de l'état global
    const dispatch = useDispatch();

      //Permet d'utiliser la navigation
    const navigate = useNavigate();
    
    //S'exécute après chaque modification du composant.
    useEffect(() => {
      // Rediriger l'utilisateur vers la page d'authentification si l'utilisateur n'est pas connecter
     if(!isAuthenticated()){
      navigate('/login');
      addToast('You must log in to access this session', {
        appearance: 'info',
        autoDismiss: true, 
        autoDismissTimeout: 3000, 
      });
     }
    }, );
   
    //S'exécute après chaque modification du composant.
    useEffect(() => {
      //Recuperation des informations de l'utilisateur authentifier
        const fetchData = async () => {
          try {
            const currentUser = getCurrentUser();
            const user = await dispatch(getUser(currentUser._id)); 
            setName(user.name); 
          } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur', error);
          }
        };
    
        fetchData(); 
      }, [dispatch]);

      // Permet de deconnecter l'utilisateur
    const handleLogout = async () => {
      const log =  await dispatch(logout());
      if(log){
        addToast('Your are logout .', {
          appearance: 'success',
          autoDismiss: true, 
          autoDismissTimeout: 3000, 
        });
         // Permet la navigation vers la page de Connection
        navigate('/login');
      }
    };

    return (
        <>  
       <Container className={classes.containt}>
          <Container className={classes.container}>
            <h3 style={{ marginLeft: '5rem'}} >{name}</h3>   
          </Container>

          <Container className={classes.container}>
          <Button onClick={handleLogout} className={classes.buttonback} variant="contained" >
            Logout
          </Button>
          </Container> 
    </Container>
           
        </>
    );
};

export default UserInfo;
