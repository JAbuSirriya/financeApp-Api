const jwt = require('jsonwebtoken');
const secretKey = require('../config').secretKey;

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.sendStatus(401);
    }
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token,secretKey, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
  }


module.exports = authenticateToken;