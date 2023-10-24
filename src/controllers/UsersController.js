const knex = require("../database/knex");
const { hash } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    try {
      const checkUserExists = await knex("users").where({ email });

      if (checkUserExists.length > 0) {
        throw new Error("Este e-mail já está em uso.");
      }

      const hashedPassword = await hash(password, 8);

      await knex("users").insert({ name, email, password: hashedPassword });

      return response.status(201).json("Usuario criado com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  }
}

module.exports = UsersController;