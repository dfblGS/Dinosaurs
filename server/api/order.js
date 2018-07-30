const router = require('express').Router()
const {OrderHistories} = require('../db/models')
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