const router = require('express').Router()
const {Cart, CartDino} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const [cart, wasCreated] = await Cart.findOrCreate({
      where: {
        id: this.userId
      }
    })
    console.log('CART:', cart)
    console.log('WASCREATED:', wasCreated)

    res.json(cart)
  } catch (error) {
    next(error)
  }
})
