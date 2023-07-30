require('dotenv').config();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


function authenticationMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const token1 = token.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token1, process.env.JWT_SECRET);
    
    const adminValue = decodedToken.admin;
    if(adminValue==='admin'){
    next(); }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = {authenticationMiddleware};
