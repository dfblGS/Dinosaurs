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
    const dinosP = req.body.map(async(dino) => {
      const found = await CartDino.findOne({where: {cartId, dinosaurId: dino.id }})
      if(!found){
        await CartDino.create({cartId, dinosaurId: dino.id, quantity: dino.quantity})
      } else{
        const qtd = found.quantity + dino.quantity
        await CartDino.update({quantity: qtd}, {where: { cartId, dinosaurId: dino.id}})
      }
    })
    await Promise.all(dinosP)
    const dinos = await CartDino.findAll({include: [{all:true, nested: true}]})
    console.log('///////', dinos)

    res.send(dinos)
  } catch (error) {
    next(error)
  }
})
