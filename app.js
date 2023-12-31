if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')  
const methodOverride = require('method-override')
const path = require('path')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT 

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'SESSION_SECRET', resave: false, saveUninitialized: false }))
app.use(flash()) 
app.use(methodOverride('_method'))
app.use("/public", express.static(path.join(__dirname, "public")))
app.use("/upload", express.static(path.join(__dirname, "upload")))
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg') 
  res.locals.warning_msg = req.flash('warning_msg')  
  next()
 })

 app.use(routes)
// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})