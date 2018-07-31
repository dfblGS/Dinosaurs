const Sequelize = require('sequelize')
const db = require('../db')

const Dinosaurs = db.define('dinosaur', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0,
			isNumeric: true,
		},
	},
	description: {
		type: Sequelize.TEXT,
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: "https://i.imgur.com/fFU0FZ8.png",
		validate: {
			isUrl: true,
			notEmpty: true,
		},
	},
	expirationDate: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
})

module.exports = Dinosaurs