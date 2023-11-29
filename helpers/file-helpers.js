const fs = require('fs') 
const localFileHandler = files => {
  if (!files) return null 
  return Promise.all(
    files.map(async file => {
      const fileName = `upload/${file.originalname}`
      const data = await fs.promises.readFile(file.path)
      await fs.promises.writeFile(fileName, data)
      return (`/${fileName}`)
    })
  )
}
module.exports = {
  localFileHandler
}