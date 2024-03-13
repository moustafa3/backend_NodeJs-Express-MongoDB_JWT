const Tran = require('../models/transactionmodel');

const getUsers = async (req, res) => {
  try {
    const users = await Tran.find({}, { password: 0 });
    return res.status(200).json(users);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

module.exports = {
  getUsers,
};
