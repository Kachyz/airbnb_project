const express = require('express')
const router = express.Router() //Solo trabajaremos con las rutas, no necesitamos todas las funcionalidades de EXPRESS
const params = require('strong-params')
const jwt = require('jsonwebtoken')
const Users = require('../db/models/users')
var bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT);

router.use(params.expressMiddleware())

router.post('/signup', (req, res) => {
  const params = req.parameters
  let userParams = params.require('user').permit('email', 'password').value()

  if(!validMail(userParams.email)) {
    res.send("Wrong email format")
    return
  }
  
  if(!strongPwd(userParams.password)){
    res.send("Password is not strong enough")
    return
  }

  Users.find({ email: userParams.email }, (err, docs) => {
    if(docs.length > 0)
      res.send('Mail already in use')
    else {  
      bcrypt.hash(userParams.password, saltRounds, (err, hash) => {
        userParams.password = hash
        const user = new Users(userParams) // Guardar en la base de datos
        user.save()
          .then( createdUser => {
            const token = jwt.sign(createdUser.toJSON(), 'devefe')
            res.send({token}) //{token} es lo mismo que {token: token}
          })
          .catch( err => {
            console.log('Error recibido al tratar de guardar usuario -', err);
          })
      });
    }
  });
})

router.post('/login', (req, res) => {
  const params = req.parameters
  let userParams = params.require('user').permit('email', 'password').value()
  Users.findOne({ 
    email: userParams.email 
  }, (err, user) => {
    if (err) return res.send(error);

    bcrypt.compare(userParams.password, user.password, (err, response) => {
      if(response)
        return res.send("si son iguales")
      res.send("Las contrasenas no hacen match")
    })
  })
})

const strongPwd = password => {
  return (
    (password.match(/[A-Z]/)) &&
    (password.match(/[a-z]/) ) &&
    (password.match(/\d/) ) &&
    (password.match(/[\s-_!\.@#$%\+\*=]/) ) &&
    (password.length >= 8)
  )
}

const validMail = mail => mail.match(/^[\w\.-]+@\w+\.[a-z]{2,}$/)

module.exports = router