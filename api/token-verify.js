const jwt = require('jsonwebtoken');

const secret = 'myCat'; // this should be an ENV variable

function verifyToken(token, secret) {
  return jwt.verify(payload, secret);
}

const payload = verifyToken(token, secret);
