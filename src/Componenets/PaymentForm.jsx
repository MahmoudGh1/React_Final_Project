import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPayment } from "../redux/slices/paymentSlice.js";
import { clearSelected } from "../redux/slices/courseSlice.js";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from 'react-i18next';


export default function PaymentForm({ total }) {
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation("translation", {keyPrefix: "payment"});

	const items = useSelector((state) => state.cart.items);
	const selectedForCheckout = useSelector((state) => state.cart.selectedForCheckout);
	const selectedCourses = items.filter((item) => selectedForCheckout.includes(item.id));

	const [isProcessing, setIsProcessing] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();
		if (elements == null) return;

		setIsProcessing(true);
		setErrorMessage(null);

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:5173/result",
			},
			redirect: 'if_required'
			// This now won't check the payment status check so we have to write confirmParams: {return_url: "if_required"} then navigate to manually there
			// https://stackoverflow.com/questions/78055460/how-do-fix-automatic-redirect-when-i-get-a-paymentintent-url-from-stripe
		});

		if (error) {
			setErrorMessage(error.message);
			setIsProcessing(false);
			return;
		}
		
		if (paymentIntent.status === "succeeded") {
				dispatch(resetPayment());
				dispatch(clearSelected());
				navigate("/result", { state: { success: true, courses: selectedCourses } });
			}
	}

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
			<PaymentElement />

			{errorMessage && (
				<Typography color="#ff4d4d" fontSize="0.9rem" mt={2}>
					{errorMessage}
				</Typography>
			)}

			<Button
				type="submit"
				disabled={isProcessing || !stripe}
				fullWidth
				sx={{ mt: "28px", py: "14px", bgcolor: isProcessing ? "#555" : "#ffd700", color: isProcessing ? "#aaa" : "#000", borderRadius: 2, fontWeight: 700, fontSize: "1rem", textTransform: "none", cursor: isProcessing ? "not-allowed" : "pointer", transition: "background 0.3s", "&:hover": { bgcolor: isProcessing ? "#555" : "#e6c200" }, "&.Mui-disabled": { bgcolor: "#555", color: "#aaa" } }}
			>
				{isProcessing ? t("processing") : `${t("pay")} $${total}.00`}
			</Button>
		</Box>
	);
}

// https://dev.to/mominmahmud/implementing-stripe-payments-in-a-react-app-a-step-by-step-guide-4dd9
// https://stackoverflow.com/questions/78055460/how-do-fix-automatic-redirect-when-i-get-a-paymentintent-url-from-stripe
