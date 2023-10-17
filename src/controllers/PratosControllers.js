const knex = require("../database/knex")

const movieNotesControllers = {
  create: async (req, res) => {
    const { title, description, ingredients } = req.body
    const user_id = req.user.id
    

    const [prato_id] = await knex("pratos").insert({
      title,
      description,
      user_id
    })

    const insertIngredients = ingredients.map((ingredients) => {
      return {
        prato_id,
        ingredients,
        user_id
      }
    })

    await knex("prato_tags").insert(insertIngredients)

    return res.json("Prato cadastrado")

  },

  show: async (req, res) => {
    const { id } = req.params

    const prato = await knex("pratos").where({ id }).first()
    const tags = await knex("prato_tags").where({ prato_id: id }).orderBy("ingredients")

    return res.json({
      ...prato,
      tags
    })
  },

  delete: async (req, res) => {
    const { id } = req.params

    await knex("pratos").where({ id }).delete()

    return res.json("Prato deletado")
  },

  index: async (req, res) => {
    const { title,tags } = req.query
    const user_id = req.user.id

    let pratos

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())

      pratos = await knex("prato_tags")
        .select([
          "pratos.id",
          "pratos.title",
          "pratos.user_id",
        ])
        .where("pratos.user_id", user_id)
        .whereLike("pratos.title", `%${title}%`)
        .whereIn("prato_tags.ingredients", filterTags)
        .innerJoin("pratos", "pratos.id", "prato_tags.prato_id")
        .groupBy("pratos.id")
        .orderBy("pratos.title")

    } else {
      pratos = await knex("pratos")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("created_at")
    }

    const userTags = await knex("prato_tags").where({ user_id })
    console.log(userTags)
    const pratosWhithTags = pratos.map(prato => {
      const pratoTags = userTags.filter(ingredients => ingredients.prato_id === prato.id)

      return {
        ...prato,
        tags: pratoTags
      }
    })
    console.log(pratosWhithTags)

    return res.json(pratosWhithTags)
  }
}

module.exports = movieNotesControllers