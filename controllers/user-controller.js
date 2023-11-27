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
      },
      downloadUsers: (req, res, next) => {
        User.find().select('name age')
        .lean()
        .sort({ name: 'asc' }) // desc
        .then(users => {
            //data = users.map(({_id, ...rest}) => rest)
            let data_csv = ''
            for ( row of users) {
                data_csv += `${row.name},${row.age}\r\n`
            }
            res.attachment('user_list.csv')
            //req.flash('success_msg', `User list has been downloaded`)
            //res.redirect('/users')
            res.send(data_csv)
        })
        .catch(err =>  next(err))
      },
}

module.exports = userController