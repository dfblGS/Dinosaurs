const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  active: {
    type: Sequelize.BOOLEAN,
    validate: {
      notEmpty: true
    }
  }
})


module.exports = Cart
