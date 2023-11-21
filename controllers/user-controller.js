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
        .then(user => {
            req.flash('success_msg', `${name} - ${age} has been added`)
            return res.redirect('/users')
         } )
        .catch(err =>  next(err))
    },
    updateUser: (req, res, next) => {
        const _id = req.params.id
        const { name, age } = req.body
        return  User.findOneAndUpdate({ _id }, {name, age})
          .then(() => res.redirect('/'))
          .catch(error => next(error))
    },
    deleteUser: (req, res, next) => {
        const _id = req.params.id
        return  User.findOne({ _id })
          .then(user => {
            const name = user.name
            user.remove()
            req.flash('success_msg', `${name} has been removed`)
            res.redirect('/users')
            })
          .catch(error => next(error))
      }
}

module.exports = userController