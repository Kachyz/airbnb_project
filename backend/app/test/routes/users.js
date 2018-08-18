const expect = require('chai').expect
const request = require('supertest')
const should = require('should')
const http = require('should-http')
const Users = require('../../db/models/users')
const app = require('../../app')

describe('users signup', () => {

  before((done) => {
      Users.remove({}, () => {
        done()
      })
  })

  after((done) => {
    Users.remove({}, () => {
      done()
    })
})


  it('Should signup user using email and password', (done) => {
    request(app)
      .post('/users/signup')                // el metodo a usar y contra que path
      .send(                                //lo que le vamos a mandar
      {
        "user": {
          "email": "nufffffe24ddail@com.df",
          "password": "Kachyz123!"
        }
      })
      .expect("Content-type", /json/)       //Que formato esperamos
      .end((err, res) => {
        res.should.be.json()
        res.should.have.status(200)
        res.body.should.have.property('token')
        done()
      })
  })

  it('TRY to signup but using a not valid email', (done) => {
    request(app)
      .post('/users/signup')                // el metodo a usar y contra que
      .send(                                //lo que le vamos a mandar
      {
        "user": {
          "email": "nufffffe24ddailcom.df",
          "password": "Kachyz123!"
        }
      })
      .expect("Content-type", /text/)       //Que formato esperamos
      .end((err, res) => {
        // res.should.be.json()
        res.should.have.status(200)
        res.text.should.equal('Wrong email format')
        done()
      })
  })


})