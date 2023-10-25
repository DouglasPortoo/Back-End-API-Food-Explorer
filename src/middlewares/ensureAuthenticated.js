const { verify } = require('jsonwebtoken');
const authConfig = require('../configs/auth');

function ensureAuthenticated(req, res, next) {

  const authHeader = req.headers

  try {
  if (!authHeader.cookie) {
    throw new Error('JWT token não informado');
  }

  const [, token] = authHeader.cookie.split("token=");

    const { role,sub: user_id } = verify(token, authConfig.secret)
    
    req.user = {
      id: Number(user_id),
      role,
    }

    return next()

  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message })
    }
  }
}

module.exports = ensureAuthenticated;