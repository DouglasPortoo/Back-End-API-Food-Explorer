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

  // delete: async (req, res) => {
  //   const { id } = req.params

  //   await knex("movie_notes").where({ id }).delete()

  //   return res.json("Nota deletada")
  // },

  // index: async (req, res) => {
  //   const { title } = req.query
  //   const user_id = req.user.id

  //   // let notes

  //   // if (tags) {
  //   //   const filterTags = tags.split(',').map(tag => tag.trim())

  //   //   notes = await knex("movie_tags")
  //   //     .select([
  //   //       "movie_notes.id",
  //   //       "movie_notes.title",
  //   //       "movie_notes.user_id",
  //   //     ])
  //   //     .where("movie_notes.user_id", user_id)
  //   //     .whereLike("movie_notes.title", `%${title}%`)
  //   //     .whereIn("movie_tags.name", filterTags)
  //   //     .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
  //   //     .groupBy("movie_notes.id")
  //   //     .orderBy("movie_notes.title")

  //   // } else {}

  //   const notes = await knex("movie_notes")
  //     .where({ user_id })
  //     .whereLike("title", `%${title}%`)
  //     .orderBy("created_at")


  //   const userTags = await knex("movie_tags").where({ user_id })
  //   const notesWhithTags = notes.map(note => {
  //     const noteTags = userTags.filter(tag => tag.note_id === note.id)

  //     return {
  //       ...note,
  //       tags: noteTags
  //     }
  //   })

  //   return res.json(notesWhithTags)
  // }
}

module.exports = movieNotesControllers