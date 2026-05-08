import {paymentService} from "./stripe.service.js"

export const paymentController = async (req, res) => {
	const { amount, courseTitle } = req.body;

	try {
		const paymentIntent = await paymentService(courseTitle, amount)
        if(!paymentIntent){
            throw new Error({message: "Couldn't process your stripe service!"})
        }

		return res.json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}