import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
	name: "cart",
	initialState: { items: [], selectedForCheckout: [] },
	reducers: {
		addToCart: (state, action) => {
			const alreadyExists = state.items.some((item) => item.id === action.payload.id);
			if (!alreadyExists) {
				state.items.push(action.payload);
			}
		},

		removeFromCart: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
			state.selectedForCheckout = state.selectedForCheckout.filter((id) => id !== action.payload);
		},

		toggleSelectForCheckout: (state, action) => {
			const id = action.payload;
			const isSelected = state.selectedForCheckout.includes(id);
			if (isSelected) {
				state.selectedForCheckout = state.selectedForCheckout.filter((i) => i !== id);
			} else {
				state.selectedForCheckout.push(id);
			}
		},

		clearSelectedForCheckout: (state) => {
			state.items = state.items.filter((item) => !state.selectedForCheckout.includes(item.id));
			state.selectedForCheckout = [];
		},
	},
});

export const { addToCart, removeFromCart, toggleSelectForCheckout, clearSelectedForCheckout } = cartSlice.actions;

export default cartSlice.reducer;
