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

  update: async (req, res) => {

    const { title, description,category, price,ingredients } = req.body
    const { id } = req.params
    const user_id = req.user.id
    try {

    await knex("prato_tags").where({ prato_id: id }).del()

    const insertIngredients = ingredients.map((ingredients) => {
      return {
        prato_id:id,
        ingredients,
        user_id
      }
    })

    await knex("prato_tags").insert(insertIngredients)

      await knex('pratos').where({id}).update("title", title )

      await knex('pratos').where({id}).update("description", description )

      await knex('pratos').where({id}).update("category",  category)

      await knex('pratos').where({ id}).update("price",  price)

      res.status(201).json("Prato atualizado")

    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }

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