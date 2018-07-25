/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe.only('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('POST /api/users', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          email: 'bob@gmail.com'
        })
        .expect(201)
      const createdUser = await User.findById(res.body.id)
      expect(createdUser.email).to.be.equal('bob@gmail.com')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
