if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [
    {
    name: 'Alex',
    age: 28
  },
  {
    name: 'Bob',
    age: 40
  },
  {
    name: 'Charlis',
    age: 18
  },
]

db.once('open', () => {
    Promise.all(
    SEED_USER.map( user => {
        return User.create({
            name: user.name,
            age: user.age
        })
    }))
    .then(() => {
        console.log('done.')
        process.exit()
    })
    
})