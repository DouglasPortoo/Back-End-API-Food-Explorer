const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

const pratosController = {
  create: async (req, res) => {
    const { title, category,description, price, ingredients } = req.body
    const user_id = req.user.id
    
    const [prato_id] = await knex("pratos").insert({
      title,
      category,
      description,
      price,
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
    const { title } = req.query

    let pratos = await knex("pratos").whereLike('title', `%${title}%`)

    return res.json(pratos)
  }
}

module.exports = pratosController