import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduits,deleteProduit } from '../redux/actions/produitActions';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia,Modal,Box, Button, Typography, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserInfo } from './UserInfo';
import { useToasts } from 'react-toast-notifications';

// Liste des styles de la liste des produits
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    maxHeight: 345,
  },
  media: {
    margin:'auto',
    height: 120,
    width:120
  
  },
  link: {
    textDecoration: 'none',
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    border: '2px  #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  
}));


const ProduitList = () => {
  //Permet d'envoyer des actions au store Redux pour déclencher des modifications de l'état global
  const dispatch = useDispatch();

   //Permet d'accéder aux données stockées dans le store Redux
  const produits = useSelector(state => state.produits.items);

  //Initialisation des variables du programme
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { addToast } = useToasts();


  //S'exécute après chaque modification du composant.
  useEffect(() => {
    dispatch(fetchProduits());
  }, [dispatch]);

  
  // Permet d'ouvrir la modal de confirmation pour la suppression d'un produit
  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  // Permet de fermer la modal de confirmation pour la suppression d'un produit
  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };


  // Supprime le produit sélectionner 
  const handleDelete = () => {
    dispatch(deleteProduit(selectedId))
      .then(response => {
         //Affiche un message  de succès après la bonne éxcution de l'action/requette
        addToast("Successful delete  produit", { 
          appearance: 'success',
          autoDismiss: true, 
          autoDismissTimeout: 3000, 
        });
      })
      .catch(error => {
        //Affiche un message contenant l'erreur survenu lors de l'éxcution de l'action/requette
        addToast('delete failed :  '+ error.message, {  
          appearance: 'error',
          autoDismiss: true, 
          autoDismissTimeout: 3000, 
        });
      });
      //Fermeture de lamodal 
    handleClose();
  };

  return (
    <Container className={classes.root}>
      <UserInfo></UserInfo>
      <Container className={classes.container}>
        <Button variant="text" style={{ marginBottom: '1rem'}}>Produit Lists</Button>     
      </Container>
      <Container className={classes.container}>
        <Button component={Link} to={`/add/${1}`} variant="contained" color="primary" style={{ marginBottom: '1rem'}}>
        Add Produit
      </Button>
      </Container>
      {produits.length > 0 ? "": ( 
        <Container className={classes.container}>
         <Button variant="text" >Empty Product Lists</Button>
      </Container>
        
      )}
      <Grid container spacing={3}>
        {produits.map((produit) => (
          <Grid item xs={12} sm={6} md={4} key={produit._id}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="../../logo192.png"
                  title={produit.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {produit.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: €{produit.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary"  component={Link} to={`/produit/${produit._id}/2`}>
                    UPDATE
                  </Button>
                  <Button size="small"  style={{color:'red'}}   onClick={() => handleOpen(produit._id)}>
                   DELETE
                  </Button>
                </CardActions>
              </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <Box className={classes.modalContent}>
          <Typography variant="h5" gutterBottom style={{ marginLeft: '8rem' }}>
            Confirm Deletion
          </Typography>
          <Typography gutterBottom>
            Are you sure to delete this product with ID: {selectedId}?
          </Typography>
          <Container className={classes.container}>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleDelete}
                style={{ marginRight: '7rem', marginLeft:'7rem' }}
              >
                Confirm
              </Button>
          </Container>

          <Container className={classes.container}>
            <Button 
              variant="contained" 
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Container>
          
          
        </Box>
      </Modal>
    </Container>
  );
};



export default ProduitList;
