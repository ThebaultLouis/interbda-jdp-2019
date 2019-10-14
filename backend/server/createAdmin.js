
const {app} = require('./server')
const {mongoose} = require('./db/mongoose')
const {User} = require('./models/user')

User.deleteMany({}).then(res => {
  admin = new User({
    username: 'admin',
    password: process.env.ADMIN_PW
  })

  admin.generateAuthToken().then(token => {
    console.log(admin)
  })
}).catch(e => console.log(e))
