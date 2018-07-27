const User = require('./user')
const Dinosaurs = require('./dinosaur')
const Cart = require('./cart')
const CartDino = require('./cartDino')

User.hasMany(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Dinosaurs, {through: 'cartDino'})
Dinosaurs.belongsToMany(Cart, {through: 'cartDino'})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Dinosaurs,
  Cart,
  CartDino
}
