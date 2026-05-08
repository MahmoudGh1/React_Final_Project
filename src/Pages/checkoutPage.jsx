import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../redux/slices/paymentSlice";
import PaymentForm from "../Componenets/PaymentForm.jsx";
import { Box, Typography, Button, Divider, Stack } from "@mui/material";
import { useTranslation } from 'react-i18next';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation("translation", {keyPrefix: "checkout"});

	const items = useSelector((state) => state.cart.items);
	const selectedForCheckout = useSelector((state) => state.cart.selectedForCheckout);
	const clientSecret = useSelector((state) => state.payment.clientSecret);
	const status = useSelector((state) => state.payment.status);
	// eslint-disable-next-line no-unused-vars
	const error = useSelector((state) => state.payment.error);

	const selectedCourses = items.filter((item) => selectedForCheckout.includes(item.id));
	const total = selectedCourses.reduce((sum, item) => sum + item.price, 0);

	useEffect(() => {
		if (selectedCourses.length === 0) {
			navigate("/cart");
			return;
		}
		dispatch(
			createPaymentIntent({
				amount: total,
				courseTitle: selectedCourses.map((c) => c.title).join(", "),
			}),
		);
	}, [dispatch, total, navigate, selectedCourses]);

	return (
		<Box sx={{ minHeight: "100vh", bgcolor: "rgb(255,200,0, 0.22)", p: "40px 24px", fontFamily: "sans-serif", width: "100%" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "100%", mx: "auto", mb: "36px", padding: "10px", border: "1px solid black", borderRadius: "13px" }}>
				<Button onClick={() => navigate("/cart")} sx={{ color: "black", textTransform: "none", fontSize: "14pt", fontWeight: "bold", p: 0, display: "block" }}>
					{t("backToCart")}
				</Button>
			</Box>

			<Box sx={{ maxWidth: 820, mx: "auto", display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, bgcolor: "#13131a", borderRadius: 4, overflow: "hidden", border: "1px solid #222" }}>
				<Stack sx={{ p: 5, borderRight: { xs: "none", md: "1px solid #222" }, borderBottom: { xs: "1px solid #222", md: "none" }, gap: 2 }}>
					<Typography sx={{ color: "#ffd700", fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{t("orderSummary")}</Typography>

					<Stack sx={{ gap: 1.5 }}>
						{selectedCourses.map((course) => (
							<Box key={course.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<Typography sx={{ color: "#ccc", fontSize: "0.9rem" }}>{course.title}</Typography>
								<Typography sx={{ color: "#fff", fontWeight: 700 }}>${course.price}</Typography>
							</Box>
						))}
					</Stack>

					<Divider sx={{ borderColor: "#222" }} />

					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<Typography sx={{ color: "#888" }}>{t("total")}</Typography>
						<Typography sx={{ color: "#ffd700", fontSize: "16pt", fontWeight: 800 }}>${total}.00</Typography>
					</Box>
				</Stack>

				<Box sx={{ p: 5 }}>
					<Typography sx={{ color: "#ffd700", fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2 }}>{t("paymentDetails")}</Typography>

					{status === "loading" && <Typography sx={{ color: "#888", fontSize: "0.9rem" }}>{t("preparing")}</Typography>}
					{status === "failed" && <Typography sx={{ color: "#ff4d4d", fontSize: "0.9rem" }}>`{t("error")}`</Typography>}

					{clientSecret && (
						<Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "day" } }}>
							<PaymentForm total={total} />
						</Elements>
					)}
				</Box>
			</Box>
		</Box>
	);
}
