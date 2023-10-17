const path = require ('path')
const fs = require('fs')
const uploadConfig = require("../configs/upload")

const DiskStorage = {
  saveFile: async (file) => {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )
    return file
  },

  deleteFile: async (file) => {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath)

    } catch {
      return
    }
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage