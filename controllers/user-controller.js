const User = require('../models/user')

userController = {
    getUsers: (req, res, next) => {
        User.find()
        .lean()
        .sort({ name: 'asc' }) // desc
        .then(users => {
          res.render('index', { users })

        })
        .catch(err =>  next(err))
      },
    addUser:  (req, res, next) => {
        const { name, age } = req.body
        User.create({
            name: name,
            age: age
        })
        .then(() => res.redirect('/users') )
        .catch(err =>  next(err))
    }
}

module.exports = userController