const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

  const token = req.header('Authorization')?.split(' ')[1];

  //const token = req.header('Authorization');
  console.log('Token:', token); 

  if (!token) {
    return res.status(401).json({ message: 'Pas de token, accès refusé.' });
  }

  jwt.verify(token, 'mlkjhgfsqazrfgjtyvgtjht', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide.' });
    }
    //console.log(user);
    req.userId = user.userId;
    next();
  });
};

module.exports = {
  authenticateToken,
};
