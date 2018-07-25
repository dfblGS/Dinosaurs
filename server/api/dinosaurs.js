const router = require('express').Router()
const {Dinosaur} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const dinosaurs = await Dinosaur.findAll()
    res.json(dinosaurs)
  } catch (err) {
    next(err)
  }
})
