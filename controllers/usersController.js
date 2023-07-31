const User = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json(users);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

module.exports = {
  getUsers,
};
