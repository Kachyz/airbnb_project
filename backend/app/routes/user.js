const express = require('express')
const router = express.Router() //Solo trabajaremos con las rutas, no necesitamos todas las funcionalidades de EXPRESS
const params = require('strong-params')
var bcrypt = require('bcrypt');

const saltRounds = 10;

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

  bcrypt.hash(userParams.password, saltRounds, (err, hash) => {
    userParams.password = hash
    res.send(userParams)
  });
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