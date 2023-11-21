if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT 

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(routes)

// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})