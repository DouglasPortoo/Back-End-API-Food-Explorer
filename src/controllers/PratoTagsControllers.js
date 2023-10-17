const knex = require("../database/knex")

const pratoTagsControllers = {

  index: async (req, res) => {

    const user_id = req.user.id

    const tags = await knex("prato_tags").where({ user_id }).groupBy("ingredients")

    res.json(tags)

  },
}

module.exports = pratoTagsControllers