const router = require('express').Router()
const {Dinosaurs} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const dinosaurs = await Dinosaurs.findAll()
    res.json(dinosaurs)
  } catch (err) {
    next(err)
  }
})

router.put('/:dinoId', async (req, res, next) => {
  try {
    const dinoId = req.params.dinoId
    const dino = await Dinosaurs.findById(dinoId)
    const updatedDino = await dino.update(req.body)
    res.json(updatedDino)
  } catch (error) {
    next(error)
  }
})
