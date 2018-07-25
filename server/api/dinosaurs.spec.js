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

    beforeEach(() => {
      return Dinosaur.create({
        name: dinoName
      })
    })

    it('GET /api/dinosaurs', async () => {
      const res = await request(app)
        .get('/api/dinosaurs')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(dinoName)
    })
  }) // end describe('/api/dinosaurs')
}) // end describe('Dinosaurs routes')
