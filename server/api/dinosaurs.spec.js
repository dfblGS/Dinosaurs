/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Dinosaur = db.model('dinosaur')

describe('Dinosaur routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/dinosaurs/', () => {
    const dinoName = 'T-Rex'
    const dinoPrice = 10

    let dinosaur
    beforeEach(async () => {
      dinosaur = await Dinosaur.create({
        name: dinoName,
        price: dinoPrice
      })
    })

    it('GET /api/dinosaurs', async () => {
      const res = await request(app)
        .get('/api/dinosaurs')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(dinoName)
      expect(res.body[0].price).to.be.equal(dinoPrice)
    })

    it('PUT /api/dinosaurs/:dinoId', async () => {
      const res = await request(app)
        .put(`/api/dinosaurs/${dinosaur.id}`)
        .send({
          name: 'NEW DINO NAME HERE HELLO!!!'
        })
        .expect(200)
      expect(res.body.name).to.equal('NEW DINO NAME HERE HELLO!!!')
    })
  }) // end describe('/api/dinosaurs')
}) // end describe('Dinosaurs routes')
