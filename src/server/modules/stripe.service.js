import dotenv from "dotenv"
import stripe from "stripe"
dotenv.config()

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

export const paymentService = async (courseTitle, amount) => {
	const intents = await stripeClient.paymentIntents.create({
		amount: amount * 100,
		currency: "usd",
		metadata: { courseTitle },
	});
    return intents
};


// https://docs.stripe.com/sdks/server-side
// https://github.com/stripe/stripe-node
// https://www.bing.com/videos/riverview/relatedvideo?q=stripe+test+card+backend&mid=6EA415D6FF0F095F31896EA415D6FF0F095F3189&churl=https%3a%2f%2fwww.youtube.com%2fchannel%2fUCFNRL1IpXaJyzYRp9pFPq8A&FORM=VIRE
// https://docs.stripe.com/testing#cards