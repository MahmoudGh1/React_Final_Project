import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createPaymentIntent = createAsyncThunk("payment/createPaymentIntent", async ({ amount, courseTitle }) => {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/api/create-payment-intent`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ amount, courseTitle }),
	});

	const data = await res.json();
	return data.clientSecret;
});

const paymentSlice = createSlice({
	name: "payment",
	initialState: { clientSecret: null, status: "idle", error: null },
	reducers: {
		resetPayment: (state) => {
			state.clientSecret = null;
			state.status = "idle";
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createPaymentIntent.pending, (state) => {
			state.status = "loading";
			state.error = null;
		}),
		builder.addCase(createPaymentIntent.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.clientSecret = action.payload;
		}),
		builder.addCase(createPaymentIntent.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
	},
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
