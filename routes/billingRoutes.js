const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	 app.post('/api/stripe', requireLogin, async (req, res) => {
	 	const charge = await stripe.charges.create({
	 		amount: 500,
	 		currency: 'usd',
	 		description: '$5 for 5 credits',
	 		source: req.body.id
	 	})

	 	req.user.credits += 5;
	 	const user = await req.user.save();

	 	res.send(user);
	 });
};

/*
token will end up inside this request handler. 
Logic to handle the token somehow reach out to the Stripe
API and finalize the actual charge.
After we finalize the charge we'll make sure that we update
the user's number of credits

*/
