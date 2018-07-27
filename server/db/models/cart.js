const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  active: Sequelize.BOOLEAN
})

module.exports = Cart
