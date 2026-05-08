/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTranslation } from 'react-i18next';

export default function CartIcon({ border = "1px solid #333", color = "black", fontSize = "18pt" }) {
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart.items);
	const count = cartItems.length;
	const { t } = useTranslation();

	const handleClick = () => {
		navigate("/cart");
	};

	return (
		<Button onClick={handleClick} sx={{ position: "relative", minWidth: 0, border: border, borderRadius: 2, px: "14px", py: "8px", fontSize: "1.3rem", lineHeight: 1, color: "inherit", bgcolor: "transparent" }}>
			<Badge badgeContent={count} invisible={count === 0} sx={{ "& .MuiBadge-badge": { bgcolor: "#ffd700", color: "#000", fontWeight: 800, fontSize: "0.7rem", width: 20, height: 20, borderRadius: "50%", minWidth: 0 } }}>
				<ShoppingCartIcon sx={{ fontSize: fontSize, color: color }} />
			</Badge>
		</Button>
	);
}
