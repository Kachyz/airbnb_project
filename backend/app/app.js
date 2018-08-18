const express = require('express')
const app = express()
const users = require('./routes/user')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const auth = require('./middlewares/auth');
const homes = require('./routes/homes');
const reservations = require('./routes/reservations')

const PORT = process.env.PORT

app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(auth);

app.use('/users', users)
app.use('/homes', homes);
app.use('/reservations', reservations);

app.get('/', (_req, res) => { // las variables que se tienen que declarar pero no se necesitas se ponen con _ al inicio por convencion
  res.send('Backend airbnb')
})

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
})

module.exports = app