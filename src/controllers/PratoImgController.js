const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

const pratoImgController = {

  update: async (req, res) => {
    const { id } = req.params
    const avatarfilename = req.file.filename

    try {

      const [prato] = await knex("pratos").where({ id })

      if (!prato) {
        throw new Error('apenas usuarios cadastrados podem mudar o avatar')
      }

      if (prato.img) {
        await DiskStorage.deleteFile(prato.img)
      }

      const filename = await DiskStorage.saveFile(avatarfilename)

      prato.img = filename

      await knex("pratos").where({ id }).update("img", prato.img)

      return res.json([prato])

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }

  },
}

module.exports = pratoImgController