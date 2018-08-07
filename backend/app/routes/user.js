const express = require('express')
const router = express.Router() //Solo trabajaremos con las rutas, no necesitamos todas las funcionalidades de EXPRESS
const params = require('strong-params')
var bcrypt = require('bcrypt');

const saltRounds = 10;

router.use(params.expressMiddleware())

router.post('/signup', (req, res) => {
  const params = req.parameters
  let userParams = params.require('user').permit('email', 'password').value()

  bcrypt.hash(userParams.password, saltRounds, (err, hash) => {
    console.log(hash);
    console.log(err);
    userParams.password = hash
    res.send(userParams)
  });
  
})

module.exports = router