const User = require('../models/user')
const Picture = require('../models/picture')
const { localFileHandler } = require('../helpers/file-helpers') 

userController = {
    getUsers: (req, res, next) => {
        User.find()
        .lean()
        .sort({ name: 'asc' }) // desc
        .then(users => {
            Promise.all(
            users.map( user =>{
                return Picture.find({userId:user._id}).lean()
                .then(pictures => {
                    user
                    user['pictures'] = pictures.map(({picture,_id,...rest}) => {return {picture,_id}})
                })
            })
          ).then(() => res.render('index', { users }))
        })
        .catch(err =>  next(err))
      },
    postUser:  (req, res, next) => {
        const { name, age } = req.body
        const { files } = req
        User.create({
            name: name,
            age: age
        })
        .then(user =>{ 
            localFileHandler(files)
            .then(filePaths => {
                if(!filePaths) return null
                return filePaths.map( filePath => Picture.create({picture: filePath, userId:user._id}))
            })
        })
        .then(() => {
            req.flash('success_msg', `${name} - ${age} has been added`)
            return res.redirect('/users')
         } )
        .catch(err =>  next(err))
    },
    putUser: (req, res, next) => {
        const _id = req.params.id
        const { name, age } = req.body
        const { files } = req
        User.findOneAndUpdate({ _id },{name, age})
        .then( user => {
            return localFileHandler(files)
            .then(filePaths => {
                if(!filePaths) return null
                return filePaths.map( filePath => Picture.create({picture: filePath, userId:user._id}))
            })
        })
        .then(() => res.redirect('/'))
        .catch(error => next(error))
    },
    deleteUser: (req, res, next) => {
        const _id = req.params.id
        return  User.findOneAndDelete({ _id })
          .then(user => {
            req.flash('success_msg', `${user.name} has been removed`)
            res.redirect('/users')
            })
          .catch(error => next(error))
      },
      deletePicture: (req, res, next) => {
        const {userId, picId} = req.params
        return  Picture.findOneAndDelete({_id: picId, userId:userId})
        .then(res.redirect('back'))
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
      }
}

module.exports = userController