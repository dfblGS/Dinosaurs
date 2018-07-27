const Sequelize = require('sequelize')
const db = require('../db')

const CartDino = db.define('cartDino', {
  quantity: Sequelize.INTEGER
})

module.exports = CartDino
