const router = require('express').Router()
const stripe = require("stripe")(process.env.STRIPE_CHARGE_KEY) //Shh, this key is secret.
module.exports = router

router.use(require("body-parser").text())

router.post("/", async (req, res) => {
  try {
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
