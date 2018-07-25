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

    it('fails if the dino has no name', async () => {
      const dinosaur = Dinosaurs.build();

      try {
        await dinosaur.validate();
        throw Error("It worked. It shouldn't have had.");
      }
      catch (err) {
        expect(err.message).to.contain('name cannot be null');
      }
    })

    it ('fails if the dino is an empty string', async () => {
      const dinosaur = Dinosaurs.build({name: ''});

      try {
        await dinosaur.validate();
        throw Error("Name is empty, and it worked. It shouldn't.");
      }

      catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    })
  })
})
