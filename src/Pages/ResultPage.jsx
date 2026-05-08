import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedForCheckout, removeFromCart } from "../redux/slices/cartSlice.js";
import { useEffect } from "react";
import { update } from "../redux/slices/users.slice.js";

export default function ResultPage() {
	const { state } = useLocation();
	const user = useSelector((state) => state.users.currentUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const success = state?.success;
	const courses = state?.courses || [];

	const handleUpdate = async () => {
		const newCoursesArray = Array.isArray(courses) ? courses : [courses];
		const existingCourses = user.courses || [];
		const updatedCoursesList = [...existingCourses, ...newCoursesArray];

		const updatedUser = {
			...user,
			courses: updatedCoursesList,
		};

		await fetch(`http://localhost:3001/users/${user.id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ courses: updatedCoursesList }),
		});

		dispatch(update(updatedUser));
	};

	useEffect(() => {
		const enrolled = courses.every((course) => user.courses?.some((userCourse) => userCourse.id === course.id));
		if (success && courses.length > 0 && !enrolled) {
			handleUpdate();
			dispatch(removeFromCart(courses));
			dispatch(clearSelectedForCheckout(courses));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [courses, success]);

	const { t } = useTranslation("translation", { keyPrefix: "result" });

	return (
		<Box sx={{ minHeight: "100vh", bgcolor: "rgb(255,200,0, 0.22)", display: "flex", alignItems: "center", width: "100%", justifyContent: "center", fontFamily: "sans-serif", p: 3 }}>
			<Paper elevation={0} sx={{ bgcolor: "#13131a", border: "1px solid #222", borderRadius: 4, p: "52px", textAlign: "center", maxWidth: 480, width: "100%" }}>
				<Typography sx={{ fontSize: "3.5rem", mb: 2 }}>{success ? "🎉" : "❌"}</Typography>

				<Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: success ? "green" : "red" }}>
					{success ? t("successTitle") : t("failedTitle")}
				</Typography>

				{success && courses.length > 0 && (
					<>
						<Typography sx={{ color: "#888", mb: 2, lineHeight: 1.6 }}>{t("enrolledIn")}</Typography>

						<Stack sx={{ spacing: 1.25, mb: 2, textAlign: "left" }}>
							{courses.map((course) => (
								<Box key={course.id} sx={{ display: "flex", alignItems: "center", gap: 1.25, bgcolor: "#1a1a24", borderRadius: 2, px: 1.75, py: 1.25 }}>
									<CheckIcon sx={{ color: "#ffd700", fontWeight: 900, fontSize: "1rem" }} />
									<Typography sx={{ color: "#fff", fontSize: "0.95rem" }}>{course.title}</Typography>
								</Box>
							))}
						</Stack>

						<Typography sx={{ color: "#666", fontSize: "0.82rem", mb: 2 }}>{t("emailNote")}</Typography>
					</>
				)}

				{!success && <Typography sx={{ color: "#888", mb: 2, lineHeight: 1.6 }}>{t("failedSub")}</Typography>}

				<Button onClick={() => navigate("/courses")} sx={{ bgcolor: "#ffd700", color: "#000", borderRadius: 2, px: 4, py: 1.5, fontWeight: 700, fontSize: "1rem", mt: 1, "&:hover": { bgcolor: "#e6c200" } }}>
					{success ? t("browseMore") : t("tryAgain")}
				</Button>
			</Paper>
		</Box>
	);
}
