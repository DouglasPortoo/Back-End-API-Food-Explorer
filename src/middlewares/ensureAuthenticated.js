const { verify } = require('jsonwebtoken');
const authConfig = require('../configs/auth');

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  // if (!authHeader.cookie) {
  //   throw new AppError('JWT token não informado', 401);
  // }

  // const [, token] = authHeader.cookie.split('token=');

  if (!authHeader) {
    throw new Error("Token nao informado")
  }

  const [, token] = authHeader.split(" ")


  try {
    const { role,sub: user_id } = verify(token, authConfig.secret)

    req.user = {
      id: Number(user_id),
      role,
    }

    return next()

  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = ensureAuthenticated;