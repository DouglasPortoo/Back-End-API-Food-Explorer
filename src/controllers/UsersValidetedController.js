const knex = require("../database/knex");

class UsersValidetedController {
  async index(request, response) {
    const { user } = request

    try {
      const checkUserExists = await knex("users").where({ id: user.id });

      if (checkUserExists.length === 0) {
        throw new Error('JWT token não informado', 401);
      }

      return response.status(200).json();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  }
}

module.exports = UsersValidetedController;