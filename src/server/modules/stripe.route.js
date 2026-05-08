import express from "express"
import { paymentController } from "./stripe.controller.js";
const router = express.Router();

router.post("/create-payment-intent", paymentController);

export default router;
