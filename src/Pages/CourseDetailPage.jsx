import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice.js";
import { fetchCourses } from "../redux/slices/courseSlice.js";
import CartIcon from "../Componenets/CartIcon.jsx";
import { Box, Typography, Button, Divider, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from 'react-i18next';

export default function CourseDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const data = useSelector((state) => state.course.courses);
	const user = useSelector((state) => state.users.currentUser || {});
	// console.log(data);
	const { t } = useTranslation("translation", {keyPrefix: "courseDetail"});

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);

	const course = data.find((course) => course.id === id);
	const cartItems = useSelector((state) => state.cart.items);
	const inCart = cartItems.some((item) => item.id === course?.id);

	const handleClick = () => {
		navigate("/courses");
	};

	const handleAdding = () => {
		if(!user) {
			return alert("Sign in first to add into cart!");
		}
		return dispatch(addToCart(course)
	}

	if (!course) {
		return (
			<Box sx={{ minHeight: "100vh", bgcolor: "rgb(255,200,0, 0.22)", width: "100%", p: "32px 24px", fontFamily: "sans-serif" }}>
				<Typography color="#888">Course not found.</Typography>
				<Button onClick={handleClick} sx={{ color: "#ffd700", textTransform: "none", p: 0, mt: 1, fontSize: "0.95rem" }}>
					{t("backBtn")}
				</Button>
			</Box>
		);
	}

	return (
		<Box sx={{ minHeight: "100vh", bgcolor: "rgb(255,200,0, 0.22)", width: "100%", p: "32px 24px", fontFamily: "sans-serif" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "90%", mx: "auto", mb: "36px", padding: "10px", border: "1px solid black", borderRadius: "13px" }}>
				<Button onClick={handleClick} sx={{ color: "#000", textTransform: "none", padding: 0, fontSize: "12pt", minWidth: 0 }}>
					{t("backToCourses")}
				</Button>
				<CartIcon />
			</Box>

			<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 410px" }, gap: 5, maxWidth: "90%", mx: "auto", alignItems: "start" }}>
				<Stack sx={{ gap: 2 }}>
					<Typography sx={{ color: "#ffd700", fontSize: "16pt", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", direction: "ltr" }}>{course.level}</Typography>

					<Typography sx={{ color: "black", fontSize: "21pt", fontWeight: 800, lineHeight: 1.2, direction: "ltr" }}>{course.title}</Typography>

					<Typography sx={{ color: "black", lineHeight: 1.75, fontSize: "14pt", direction: "ltr" }}>{course.longDescription}</Typography>

					<Box sx={{ display: "flex", gap: "28px", flexWrap: "wrap", direction: "ltr" }}>
						{[
							{ icon: "🕐", text: course.duration },
							{ icon: "📚", text: `${course.lessons} lessons` },
							{ icon: "📶", text: course.level },
						].map(({ icon, text }) => (
							<Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1, color: "black", fontSize: "12pt", direction: "ltr" }}>
								<Typography sx={{fontSize: "14pt", direction: "ltr"}}>{icon}</Typography>
								<Typography sx={{fontSize: "inherit", color: "inherit", direction: "ltr"}}>
									{text}
								</Typography>
							</Box>
						))}
					</Box>

					<Box sx={{ borderTop: "1px solid #222", pt: 3 }}>
						<Typography sx={{color: "black",  fontSize: "18pt",  fontWeight: 900 , mb: 2}}>
							{t("learnTitle")}
						</Typography>
						<Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, direction: "ltr" }}>
							{course.topics.map((topic) => (
								<Box key={topic} sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
									<CheckIcon sx={{ color: "black", fontWeight: 700, fontSize: "12pt" }} />
									<Typography color="#ccc" fontSize="16pt">
										{topic}
									</Typography>
								</Box>
							))}
						</Box>
					</Box>
				</Stack>

				<Box sx={{ bgcolor: "#13131a", border: "1px solid #222", borderRadius: "14px", p: "28px", display: "flex", flexDirection: "column", gap: 1.75, position: "sticky", top: 24 }}>
					<Box>
						<Typography sx={{color: "#ffd700", fontSize: "21pt", fontWeight: 800, lineHeight: 1}} component="span">
							${course.price}
						</Typography>
					</Box>

					<Typography sx={{color: "#666", fontSize: "10pt", mt: "-8px"}}>
						{t("oneTime")}
					</Typography>

					<Divider sx={{ borderColor: "#222" }} />

					<Stack gap={1}>
						<Typography sx={{color: "#fff", fontWeight: 700, fontSize: "0.9rem"}}>
							{t("includes")}
						</Typography>
						{[`${course.duration} ${t("duration")}`, `${course.lessons} ${t("lessons")}`, t("lifetime"), t("certificate")].map((item) => (
							<Typography key={item} sx={{color: "#ccc", fontSize: "12pt"}}>
								✔ {item}
							</Typography>
						))}
					</Stack>

					<Divider sx={{ borderColor: "#222" }} />

					{inCart ? (
						<>
							<Typography color="#4caf50" fontWeight={700} textAlign="center" fontSize="0.95rem">
								{t("inCartMsg")}
							</Typography>
							<Button onClick={() => navigate("/cart")} fullWidth sx={{ color: "#ffd700", border: "2px solid #ffd700", borderRadius: 2, py: 1.5, fontWeight: 700, fontSize: "0.95rem", textTransform: "none"}}>
								{t("goToCart")}
							</Button>
						</>
					) : (
						<Button onClick={() => handleAdding)} fullWidth sx={{ bgcolor: "#ffd700", color: "#000", borderRadius: 2, py: 1.75, fontWeight: 800, fontSize: "1rem", textTransform: "none", "&:hover": { bgcolor: "#e6c200" }}}>
							{t("addToCart")}
						</Button>
					)}

					<Button onClick={() => navigate("/courses")} fullWidth sx={{ color: "#666", border: "1px solid #333", borderRadius: 2, py: 1.25, fontSize: "0.85rem", textTransform: "none", "&:hover": {bgcolor: "white", color: "black"}}}>
						{t("browseMore")}
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
