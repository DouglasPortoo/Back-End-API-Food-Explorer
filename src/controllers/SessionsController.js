const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const knex = require("../database/knex");
const authConfig = require("../configs/auth");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    try {
      const user = await knex("users").where({ email }).first();

      if (!user) {
        throw new Error("E-mail e/ou senha incorreta.", 401);
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        throw new Error("E-mail e/ou senha incorreta.", 401);
      }

      const { secret } = authConfig;

      const token = sign({ role: user.role }, secret, {
        subject: String(user.id),

      });

      response.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 15 * 60 * 1000 //15min
      })

      delete user.password

      response.status(201).json( {user })
      // response.status(201).json({ user, token })

    } catch(error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }
    }
}
}

module.exports = SessionsController;