import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, toggleSelectForCheckout } from "../redux/slices/cartSlice.js";
import { Box, Typography, Button, Divider, Stack } from "@mui/material";
import CartIcon from "../Componenets/CartIcon.jsx";
import { useTranslation } from 'react-i18next';

export default function CartPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation("translation", {keyPrefix: "cart"});

	const items = useSelector((state) => state.cart.items);
	const selectedForCheckout = useSelector((state) => state.cart.selectedForCheckout);

	const selectedCourses = items.filter((item) => selectedForCheckout.includes(item.id));
	const total = selectedCourses.reduce((sum, item) => sum + item.price, 0);

	function handleRemove(id) {
		dispatch(removeFromCart(id));
	}
	function handleToggle(id) {
		dispatch(toggleSelectForCheckout(id));
	}
	function handleCheckout() {
		if (selectedCourses.length === 0) return;
		navigate("/checkout");
	}

	const handleRemoval = (e, item) => {
		e.stopPropagation();
		handleRemove(item.id);
	};

	if (items.length === 0) {
		return (
			<Box sx={{ minHeight: "100vh", bgcolor: "rgb(255,200,0, 0.22)", p: "32px 24px", width: "100%", fontFamily: "sans-serif" }}>
				<Box sx={{ maxWidth: "100%", mx: "auto", p: "10px", mb: 4, border: "1px solid black", borderRadius: "10px", width: "100%" }}>
					<Button onClick={() => navigate("/courses")} sx={{ color: "black", textTransform: "none", fontWeight: "bold", fontSize: "16pt", p: 0 }}>
						{t("backToCourses")}
					</Button>
				</Box>

				<Stack sx={{ minHeight: "60vh", gap: 3, alignItems: "center", justifyContent: "center" }}>
					<Typography sx={{ fontSize: "48pt" }}>
						<CartIcon border="1px solid transparent" color="black" fontSize="48pt"></CartIcon>
					</Typography>
					<Typography sx={{ color: "#000", fontSize: "24pt", fontWeight: 700 }}>{t("emptyTitle")}</Typography>
					<Typography sx={{ color: "#666", fontSize: "14pt" }}>{t("emptySub")}</Typography>
					<Button onClick={() => navigate("/courses")} sx={{ bgcolor: "#ffd700", color: "#000", borderRadius: 2, px: 4, py: 1.5, fontWeight: 700, fontSize: "16pt", textTransform: "none", mt: 1, "&:hover": { bgcolor: "#e6c200" } }}>
						{t("browseCourses")}
					</Button>
				</Stack>
			</Box>
		);
	}

	return (
		<Box sx={{ minHeight: "100vh", p: "32px 24px", width: "100%", bgcolor: "rgb(255,200,0, 0.22)", fontFamily: "sans-serif" }}>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2.5, maxWidth: "100%", mx: "auto", mb: 4, border: "1px solid black", borderRadius: "10px", p: "10px" }}>
				<Typography sx={{ color: "#000", fontSize: "18pt", fontWeight: 800, flexGrow: 1 }}>{t("heading")}</Typography>
				<Typography sx={{ color: "#666", fontSize: "12pt" }}>
					{items.length} {items.length > 1 ? t("courses") : t("course")}
				</Typography>
			</Box>

			<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 520px" }, gap: 4, maxWidth: "100%", mx: "auto", alignItems: "start" }}>
				<Stack sx={{gap: 2}} >
					<Typography sx={{color: "#888", fontSize: "16pt", mb: "20px"}} >
						{t("hint")}
					</Typography>

					{items.map((item) => {
						const isChecked = selectedForCheckout.includes(item.id);

						return (
							<Box key={item.id} onClick={() => handleToggle(item.id)} sx={{ display: "flex", color: "white", alignItems: "flex-start", gap: 2, bgcolor: "#13131a", border: `2px solid ${isChecked ? "#ffd700" : "#222"}`, borderRadius: 3, p: "20px", cursor: "pointer", transition: "border-color 0.2s", direction: "ltr" }}>
								<Box sx={{ width: 22, height: 22, borderRadius: "6px", border: `2px solid ${isChecked ? "#ffd700" : "#555"}`, flexShrink: 0, mt: "2px", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: isChecked ? "#ffd700" : "transparent", transition: "all 0.2s" }}>
									{isChecked && (
										<Typography sx={{color: "#000", fontSize: "10pt", fontWeight: 900, lineHeight: 1}}>
											✓
										</Typography>
									)}
								</Box>

								<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.25 }}>
									<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1.5 }}>
										<Box>
											<Typography sx={{color: "#ffd700", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", mb: 0.5}} >
												{item.level}
											</Typography>
											<Typography sx={{color: "#fff", fontSize: "1.05rem", fontWeight: 700}} >
												{item.title}
											</Typography>
											<Typography sx={{color: "#888", fontSize: "0.85rem", mt: 0.5}} >
												{item.description}
											</Typography>
										</Box>
										<Typography sx={{color: "#ffd700", fontSize: "1.3rem", fontWeight: 800, flexShrink: 0}} >
											${item.price}
										</Typography>
									</Box>

									<Box sx={{ display: "flex", gap: 2.5, color: "#555", fontSize: "0.8rem" }}>
										<Typography sx={{fontSize: "inherit", color: "inherit"}} >
											🕐 {item.duration}
										</Typography>
										<Typography sx={{fontSize: "inherit", color: "inherit"}}>
											📚 {item.lessons} lessons
										</Typography>
									</Box>
								</Box>

								<Button onClick={(e) => handleRemoval(e, item)} sx={{ color: "#444", minWidth: 0, p: "4px 8px", borderRadius: "6px", flexShrink: 0, fontSize: "1rem", "&:hover": { color: "#ff4d4d", bgcolor: "transparent" } }}>
									✕
								</Button>
							</Box>
						);
					})}
				</Stack>

				<Stack sx={{ bgcolor: "#13131a", border: "1px solid #222", borderRadius: "14px", p: 3, position: "sticky", top: 24, gap: 3 }}>
					<Typography sx={{color: "#fff", fontSize: "1.1rem", fontWeight: 700}} >
						{t("orderSummary")}
					</Typography>

					<Divider sx={{ borderColor: "#222" }} />

					{selectedCourses.length === 0 ? (
						<Typography sx={{ whiteSpace: "pre-line", color: "#555", fontSize: "0.85rem", textAlign: "center", lineHeight: 1.7 }}>
							{t("noSelection")}
						</Typography>
					) : (
						<Stack sx={{gap: 1.25}}>
							{selectedCourses.map((course) => (
								<Box key={course.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<Typography sx={{color: "#ccc", fontSize: "0.88rem"}}>
										{course.title}
									</Typography>
									<Typography sx={{color: "#ffd700", fontSize: "0.95rem", fontWeight: 700}} >
										${course.price}
									</Typography>
								</Box>
							))}
						</Stack>
					)}

					<Divider sx={{ borderColor: "#222" }} />

					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<Typography sx={{color: "#fff", fontWeight: 700, fontSize: "1rem"}} >
							{t("total")}
						</Typography>
						<Typography sx={{color: "#ffd700", fontSize: "16pt", fontWeight: 800}} >
							${total}.00
						</Typography>
					</Box>

					<Button onClick={handleCheckout} disabled={selectedCourses.length === 0} fullWidth sx={{ bgcolor: "#ffd700", color: "#000", borderRadius: 2, py: 1.75, fontWeight: 800, fontSize: "1rem", textTransform: "none", "&:hover": { bgcolor: "#e6c200" }, "&.Mui-disabled": { bgcolor: "#ffd700", color: "#000", opacity: 0.4 } }}>
						{t("proceedToPay")}{selectedCourses.length > 0 && ` (${selectedCourses.length})`}
					</Button>

					{selectedCourses.length === 0 && (
						<Typography sx={{color: "#555", fontSize: "0.78rem", textAlign: "center", mt: "-8px"}}>
							{t("selectHint")}
						</Typography>
					)}
				</Stack>
			</Box>
		</Box>
	);
}

// https://react.i18next.com/guides/quick-start
// https://react.i18next.com/latest/usetranslation-hook