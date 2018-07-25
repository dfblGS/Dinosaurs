const chai = require('chai');
const expect = chai.expect;
const db = require('../index')
const Dinosaurs = db.model('dinosaur')

describe('Dinosaur model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Dino Validations', () => {
    let theDino

    beforeEach(async () => {
      theDino = await Dinosaurs.create({
        name: 'Velociraptor',
        price: 22,
        description: "A clever girl.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Velociraptor_Restoration.png/220px-Velociraptor_Restoration.png"
      })
    })

    it('fails if the dino has no name', () => {
      expect(async () => {await Dinosaurs.create({price: 22})}).to.throw()
    })
  })
})
