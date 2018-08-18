const express = require('express')
const router = express.Router() 
const params = require('strong-params')
const Reservations = require('../db/models/reservation')
const Homes = require('../db/models/homes')

router.use(params.expressMiddleware());

router.post('/', (req, res) => {
  const params = req.parameters;
  let reservationParams = params.require('reservation').permit('home_id', {date:[]}).value()
  const user = req.user
  Homes.findById(reservationParams.home_id, (err, home) => {
    if (err) return res.send({err})
    const datesNotAvailable = home.datesNotAvailable;
    const availability = reservationParams.date.some( element => {
      // KACHYZ aqui hay que arreglar la comparacion de fechas
      return datesNotAvailable.includes(element)
    })

    if(availability) return res.send("Las fechas no estan disponibles")

    reservationParams.guest_id = user.id
    const newReservation = new Reservations(reservationParams)
    newReservation.save()
      .then((reservation) => {
        home.set({datesNotAvailable: datesNotAvailable.concat(reservationParams.date)})
        home.save()
          .then((updatedHome) => {
            res.send({reservation})
          })
      })

  })
})

router.get('/', (req, res) => {
  const user = req.user
  Reservations.find({
    guest_id: user.id
  }, (err, reservations) => {
    res.send({reservations})
  })
})

module.exports = router