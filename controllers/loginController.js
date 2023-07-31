const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'L\'utilisateur n\'existe pas.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ userId: user._id }, 'mlkjhgfsqazrfgjtyvgtjht', { expiresIn: '1h' });
    return res.status(200).json({ token });
    
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    return res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
};

module.exports = {
  login,
};
