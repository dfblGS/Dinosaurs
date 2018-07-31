const router = require('express').Router()
const {OrderHistories, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
	try {
		const newOrder = await OrderHistories.create(req.body)
		res.status(201).send(newOrder)
	}
	catch (error) {
		next (error)
	}
})

router.get('/:userId', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.userId)
		const orderHistory = await OrderHistories.findAll({
			where: {
				userEmail: user.email
			}
		})
		res.json(orderHistory)
	}
	catch (error) {
		next (error)
	}
})