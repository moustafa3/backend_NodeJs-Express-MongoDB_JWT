const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'L\'utilisateur existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    return res.status(201).json(newUser);
  } catch (err) {
    console.error('Erreur lors de l\'inscription :', err);
    return res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
  }
};

module.exports = {
  register,
};
