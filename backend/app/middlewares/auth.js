const jwt = require('jsonwebtoken');
const Users = require('../db/models/users');

const auth = (req, res, next) => {
    if (req.path === '/users/signup' || req.path === '/users/login') return next();
    const token = req.headers.token;
    const decoded = jwt.verify(token, 'devefe');
    Users.findOne({
        email: decoded.email
    }, (err, user) => {
        if (err) return res.send("token erroneo");
        req.user = user;
        return next();
    })

};

module.exports = auth;

