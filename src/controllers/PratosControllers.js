const knex = require("../database/knex")

const pratosController = {
  create: async (req, res) => {
    const { title, description, category, ingredients } = req.body
    const user_id = req.user.id

    // const avatarfilename = req.file.filename

    // const filename = await DiskStorage.saveFile(avatarfilename)

    const [prato_id] = await knex("pratos").insert({
      // img:filename,
      title,
      description,
      category,
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