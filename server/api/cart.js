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

    const dinosaurs = req.body
    console.log(dinosaurs)

    if (!wasCreated) res.json(cart)
    else res.send()
  } catch (error) {
    next(error)
  }
})
