const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const app = express();
const port = 3000;


const authMiddleware = require('./middlewares/authMiddleware');

app.use(cors()); // Configurer CORS
app.use(express.json());

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const usersRoutes = require('./routes/users');


app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/users', authMiddleware.authenticateToken, usersRoutes);


 app.use(express.static(path.join(__dirname, 'public')));


//const dbURI = 'mongodb+srv://mostafamohamadmt:aZEbxHXaVCCqXa2B@cluster0.zab7xda.mongodb.net/?retryWrites=true&w=majority';
//mongodb://localhost:27017
const dbURI = 'mongodb://127.0.0.1:27017/loginusers';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à la base de données MongoDB');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données MongoDB:', err);
  });


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
