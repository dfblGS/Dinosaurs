const router = require('express').Router()
const stripe = require("stripe")("sk_test_M6Sf8iz8JUYfuo6mQqumBwHm"); //Shh, this key is secret.
module.exports = router

router.use(require("body-parser").text())

router.post("/", async (req, res) => {
  try {
  	console.log(req.body)
    let {status} = await stripe.charges.create({
      amount: req.body.price,
      currency: "usd",
      description: "An example charge",
      source: req.body.id
    });
    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});