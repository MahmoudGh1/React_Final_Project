import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './slices/courseSlice';
import paymentReducer from './slices/paymentSlice';
import cartReducer from './slices/cartSlice';
import usersReducer from "./slices/users.slice.js"

const store = configureStore({
  reducer: {
    course: courseReducer,
    payment: paymentReducer,
    cart: cartReducer,
    users: usersReducer
  },
});

export default store;