const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const jwt = require('jsonwebtoken');

const authMiddleware = require('./middlewares/authMiddleware');

app.use(express.json());

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const usersRoutes = require('./routes/users');


app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/users', authMiddleware.authenticateToken, usersRoutes);


app.get('/users', authMiddleware.authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

 app.use(express.static(path.join(__dirname, 'public')));

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://mostafamohamadmt:aZEbxHXaVCCqXa2B@cluster0.zab7xda.mongodb.net/?retryWrites=true&w=majority';

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
