import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../redux/slices/courseSlice.js";
import CartIcon from "../Componenets/CartIcon.jsx";
import { Box, Typography, Chip } from "@mui/material";
import { Brightness1 } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function CoursePage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart.items || []);
	const data = useSelector((state) => state.course.courses || []);
	const user = useSelector((state) => state.users.currentUser || {});
	const userCourses = user.courses || []
	const { t } = useTranslation("translation", {keyPrefix: "coursePage"});

	function handleClick(course, enrolled) {
		if(enrolled) return alert("Already enrolled in that course!");
		dispatch(setSelected(course));
		navigate(`/course/${course.id}`);
	}

	return (
		<Box sx={{ minHeight: "85vh", bgcolor: "rgb(255,200,0, 0.22)", p: "40px 24px", width: "100vw", fontFamily: "sans-serif" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "100%", mx: "auto", mb: 1 }}>
				<Typography variant="h2" sx={{ color: "#000", fontWeight: "bold", fontSize: "34pt" }}>
					{t("heading")}
				</Typography>
				<CartIcon />
			</Box>

			<Typography color="#888" textAlign="center" mb={5}>
				{t("sub")}
			</Typography>

			<Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 5, maxWidth: "80%", py: 4, mx: "auto" }}>
				{data.map((course) => {
					const inCart = cartItems.some((item) => item.id === course.id);
					const enrolled = userCourses.some((singleCourse) => singleCourse.id === course.id)

					return (
						// eslint-disable-next-line react-hooks/purity
						<Box key={course.id} onClick={() => handleClick(course, enrolled)} sx={{ position: "relative", bgcolor: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`, border: "2px solid #222", borderRadius: 3, padding: "28px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 3, transition: "border-color 0.25s, transform 0.25s", "&:hover": { borderColor: "black", transform: "translateY(-2px)" } }}>
							{inCart && <Chip label={t("inCart")} size="small" sx={{ position: "absolute", top: "5%", right: "3%", bgcolor: "black", color: "rgb(0, 255, 0)", fontSize: "8pt", fontWeight: 900, border: "1px solid #4caf50", height: "25px", borderRadius: "20px", direction: "ltr" }} />}

							<Typography sx={{ color: "#ffd700", fontSize: "14pt", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", direction: "ltr" }}>{course.level}</Typography>

							<Typography sx={{ color: "#fff", fontSize: "16pt", fontWeight: 600, direction: "ltr" }}>{course.title}</Typography>

							<Typography sx={{ color: "#fff", fontSize: "12pt", flexGrow: 1, direction: "ltr" }}>{course.description}</Typography>

							<Box sx={{ display: "flex", gap: 2, color: "#fff", fontSize: "12pt", direction: "ltr" }}>
								<Typography sx={{ fontSize: "inherit", color: "inherit", direction: "ltr" }}>🕐 {course.duration}</Typography>
								<Typography sx={{ fontSize: "inherit", color: "inherit", direction: "ltr" }}>📚 {course.lessons} lessons</Typography>
							</Box>

							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
								<Typography sx={{ color: "#ffd700", fontSize: "18pt", fontWeight: 900, direction: "ltr" }}>${course.price}</Typography>
								<Typography sx={{ color: "#000", fontSize: "12pt", fontWeight: 900 }}>{t("viewDetails")}</Typography>
							</Box>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}
