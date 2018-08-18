const express = require('express');
const params = require('strong-params');
const Homes = require('../db/models/homes');
const router = express.Router();

router.use(params.expressMiddleware());

router.post('/', (req, res) => {
    console.log(req.user);
    const params = req.parameters;
    let homeParams = params.require('home').permit('title', 'address', 'capacity', 'lat', 'long', 'type', 'price', 'description', 'services', 'beds', 'city').value();
    homeParams.user_id = req.user.id;
    const home = new Homes(homeParams);
    home.save().then((createdHome) => {
        res.send({home: createdHome})
    })
})
router.get('/:city', (req, res) => {
    const city = req.params.city;
    Homes.find({
        city: city
    }, (err, homes ) => {
        res.send({homes})
    })
})

module.exports = router;

