const Sequelize = require('sequelize')
const db = require('../db')

const OrderHistories = db.define('OrderHistory', {
	userEmail: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 'guest',
	},
	userOrder: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	userToken: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
})

module.exports = OrderHistories
