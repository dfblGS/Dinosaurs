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
    const cartId = cart.id
    const dinosP = req.body.map(async dino => {
      const found = await CartDino.findOne({
        where: {cartId, dinosaurId: dino.id}
      })
      if (!found) {
        await CartDino.create({
          cartId,
          dinosaurId: dino.id,
          quantity: dino.quantity
        })
      } else {
        const qtd = found.quantity + dino.quantity
        await CartDino.update(
          {quantity: qtd},
          {where: {cartId, dinosaurId: dino.id}}
        )
      }
    })
    await Promise.all(dinosP)
    const cartInfo = await Cart.findOne({
      where: {
        userId: req.params.userId,
        active: true
      },
      include: [{all: true, nested: true}]
    })
    res.send(cartInfo)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const [cart, wasCreated] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        active: true
      }
    })
    const [dinoLine, created] = await CartDino.findOrCreate({
      where: {
        cartId: cart.id,
        dinosaurId: req.body.id
      }
    })
    const newQuantity = dinoLine.quantity + 1
    await CartDino.update(
      {quantity: newQuantity},
      {
        where: {
          cartId: cart.id,
          dinosaurId: req.body.id
        }
      }
    )
    res.send()
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/:dinoId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        active: true
      }
    })
    await CartDino.destroy({
      where: {cartId: cart.id, dinosaurId: req.params.dinoId}
    })
    res.send()
  } catch (err) {
    next(err)
  }
})
