import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/slices/users.slice";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router";

const Profile = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.users.currentUser);
	const [disable, setDisable] = useState({ disable: true, field: "" });
	const [user, setUser] = useState({ username: state.username, password: state.password, email: state.email, gender: state.gender, courses: state.courses || [] });
	const [show, setShow] = useState(false);
	const [editing, setEditing] = useState({ edit: false, field: "" });
	const [newData, setNewData] = useState({ field: "", value: "" });
	const matches = useMediaQuery("(min-width:700px)");
	const { t } = useTranslation("translation", {keyPrefix: "profilePage"});
	const navigate = useNavigate()

	const handleChange = (event) => {
		setUser({ ...user, [event.target.name]: event.target.value });
		setNewData({ field: event.target.name, value: event.target.value });
	};

	const handleChangeStatus = (field) => {
		if (field == "password") {
			setShow(true);
		}
		setEditing({ edit: true, field });
		setDisable({ disable: false, field: "" });
	};

	const handleSave = () => {
		setShow(false);
		setEditing({ edit: false, field: "" });
		setDisable({ disable: true, field: "" });
		console.log(newData);
		handleUpdate(newData.field, newData.value);
	};

	const handleUpdate = async (name, value) => {
		const updatedUser = { ...state, [name]: value };

		await fetch(`http://localhost:3001/users/${state.id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ [name]: value }),
		});

		dispatch(update(updatedUser));
		setNewData({ field: "", value: "" });
	};

	return (
		<div style={{ justifyContent: "flex-start", width: "100%" }}>
			<Box sx={{ width: { xs: "92%", sm: "75%", md: "90%", lg: "85%" }, mx: "auto", py: 4 }}>
				<Typography variant="h5" fontWeight={500} sx={{ mb: 3 }}>
					{t("details")}
				</Typography>
				<Stack spacing={3} direction="column" sx={{ padding: "15px", width: { xs: "100%", sm: "100%", md: "95%", xl: "100%" } }} divider={<Divider orientation="horizontal" flexItem></Divider>}>
					<Box>
						<Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "5px", fontWeight: 500, display: "block", marginBottom: "20px" }}>
							{t("profile")}
						</Typography>
						<Box sx={{ backgroundColor: "white", border: "0.5px solid", borderColor: "dodgerblue", borderRadius: "15px", padding: "0 10px" }}>
							<Box sx={{ display: "flex", flexDirection: matches ? "row" : "column", alignItems: matches ? "center" : "flex-start", justifyContent: "space-between", padding: "15px 0", "&:not(:last-child)": { borderBottom: "0.5px solid", borderColor: "dodgerblue" } }}>
								<Typography variant="body2" color="text.secondary" sx={{ minWidth: 90 }}>
									{t("name")}
								</Typography>
								<Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 3 }}>
									<Avatar src={user.gender?.toLowerCase() === "male" ? "/OIP.webp" : "/OIP.webp"}></Avatar>
									<TextField name="username" id="username" type="text" sx={{ width: "fit-content" }} disabled={disable.disable} variant="standard" value={user.username} onChange={handleChange} />
								</Box>
								{editing.edit && editing.field == "username" && (
									<Button size="small" variant="text" color="primary" onClick={handleSave} startIcon={<SaveIcon fontSize="small" />}>
										{t("save")}
									</Button>
								)}
								<Typography variant="body2" color="primary" sx={{ minWidth: 90, textAlign: "right", cursor: "pointer", "&:hover": { textDecoration: "underline" } }} onClick={() => handleChangeStatus("username")}>
									{t("updateName")}
								</Typography>
							</Box>

							<Box sx={{ display: "flex", flexDirection: matches ? "row" : "column", alignItems: matches ? "center" : "flex-start", justifyContent: "space-between", padding: "15px 0", "&:not(:last-child)": { borderBottom: "0.5px solid", borderColor: "dodgerblue" } }}>
								<Typography variant="body2" color="text.secondary" sx={{ minWidth: 90 }}>
									{t("email")}
								</Typography>
								<Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
									<TextField name="email" id="email" type="email" sx={{ width: "fit-content" }} disabled={disable.disable} variant="standard" value={user.email} onChange={handleChange} />
								</Box>
								{editing.edit && editing.field == "email" && (
									<Button size="small" variant="text" color="primary" onClick={handleSave} startIcon={<SaveIcon fontSize="small" />}>
										{t("save")}
									</Button>
								)}
								<Typography variant="body2" color="primary" sx={{ minWidth: 90, textAlign: "right", cursor: "pointer", "&:hover": { textDecoration: "underline" } }} onClick={() => handleChangeStatus("email")}>
									{t("updateEmail")}
								</Typography>
							</Box>

							<Box sx={{ display: "flex", flexDirection: matches ? "row" : "column", alignItems: matches ? "center" : "flex-start", justifyContent: "space-between", padding: "15px 0", "&:not(:last-child)": { borderBottom: "0.5px solid", borderColor: "dodgerblue" } }}>
								<Typography variant="body2" color="text.secondary" sx={{ minWidth: 90 }}>
									{t("gender")}
								</Typography>
								<Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
									<TextField name="gender" id="gender" type="text" sx={{ width: "fit-content" }} disabled={disable.disable} variant="standard" value={user.gender} onChange={handleChange} />
								</Box>
								{editing.edit && editing.field == "gender" && (
									<Button size="small" variant="text" color="primary" onClick={handleSave} startIcon={<SaveIcon fontSize="small" />}>
										{t("save")}
									</Button>
								)}
								<Typography variant="body2" color="primary" sx={{ minWidth: 90, textAlign: "right", cursor: "pointer", "&:hover": { textDecoration: "underline" } }} onClick={() => handleChangeStatus("gender")}>
									{t("updateGender")}
								</Typography>
							</Box>
						</Box>
					</Box>

					<Box>
						<Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "5px", fontWeight: 500, display: "block", marginBottom: "20px" }}>
							{t("security")}
						</Typography>
						<Box sx={{ backgroundColor: "white", border: "0.5px solid", borderColor: "dodgerblue", borderRadius: "15px", padding: "0 10px" }}>
							<Box sx={{ display: "flex", flexDirection: matches ? "row" : "column", alignItems: matches ? "center" : "flex-start", justifyContent: "space-between", padding: "15px 0", "&:not(:last-child)": { borderBottom: "0.5px solid", borderColor: "dodgerblue" } }}>
								<Typography variant="body2" color="text.secondary" sx={{ minWidth: 90 }}>
									{t("password")}
								</Typography>
								<Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
									<TextField name="password" id="password" type={show ? "text" : "password"} sx={{ width: "fit-content", letterSpacing: "8px" }} disabled={disable.disable} variant="standard" value={user.password} onChange={handleChange} />
								</Box>
								{editing.edit && editing.field == "password" && (
									<Button size="small" variant="text" color="primary" onClick={handleSave} startIcon={<SaveIcon fontSize="small" />}>
										{t("save")}
									</Button>
								)}
								<Typography variant="body2" color="primary" sx={{ minWidth: 90, textAlign: "right", cursor: "pointer", "&:hover": { textDecoration: "underline" } }} onClick={() => handleChangeStatus("password")}>
									{t("updatePassword")}
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box>
						<Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "5px", fontWeight: 500, display: "block", marginBottom: "20px" }}>
							{t("myCourses")}
						</Typography>
						<Box sx={{ backgroundColor: "white", border: "0.5px solid", borderColor: "dodgerblue", borderRadius: "15px", padding: "0 10px" }}>
							<Box sx={{ display: "flex", flexDirection: "column", alignItems: matches ? "center" : "flex-start", justifyContent: "space-between", padding: "15px 0", "&:not(:last-child)": { borderBottom: "0.5px solid", borderColor: "dodgerblue" } }}>
								{user.courses.map((course) => (
									<Typography key={`${course.title}-${course.id}`} sx={{width: "100%"}}>{course.title}</Typography>
								))}
							</Box>
						</Box>
					</Box>
					{state.role === "admin" && (
						<Box>
							<Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "5px", fontWeight: 500, display: "block", marginBottom: "20px" }}>
								{t("admin")}
							</Typography>
							<Box sx={{ backgroundColor: "white", width: "fit-content", border: "0.5px solid", borderColor: "dodgerblue", borderRadius: "15px", padding: "0 10px" }}>
								<Button variant="button" onClick={() => navigate("/admin")}>{t("adminPage")}</Button>
							</Box>
						</Box>
					)}
				</Stack>
			</Box>
		</div>
	);
};

export default Profile;
