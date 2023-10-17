const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

const pratoImgController = {

  update: async (req, res) => {
    const prato_id = req.query
    const avatarfilename = req.file.filename

      const [prato] = await knex("pratos").where({ id: prato_id })

      if (!prato) {
        throw new Error('apenas usuarios cadastrados podem mudar o avatar')
      }

      if (prato.img) {
        await DiskStorage.deleteFile(prato.img)
      }

      const filename = await DiskStorage.saveFile(avatarfilename)

      prato.img = filename

      await knex("pratos").where({ id: prato_id }).update("img", prato.img)

      return res.json([prato])

  },
}

module.exports = pratoImgController