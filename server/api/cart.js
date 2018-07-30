const router = require('express').Router()
const {Cart, CartDino} = require('../db/models')
module.exports = router

router.post('/:userId', async (req, res, next) => {
  try {
    const [cart, wasCreated] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        active: true
      },
      include: [{all: true, nested: true}]
    })

    // const allDinos = [...req.body, ...cart.dinosaurs]
    // const finalDinos = allDinos.filter((dino, index) => {
    //   return index === (dino.id || dino.dinosaurId)
    // })

    if (!wasCreated) res.json(cart)
    else res.send()
  } catch (error) {
    next(error)
  }
})
