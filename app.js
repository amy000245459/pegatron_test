// 載入 express 並建構應用程式伺服器
const express = require('express')

const routes = require('./routes')
const app = express()


app.use(routes)

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})