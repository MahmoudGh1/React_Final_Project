import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import paymentRoutes from "./modules/stripe.route.js"

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({ 
    origin: "http://localhost:5173" 
}));

app.use("/api", paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
