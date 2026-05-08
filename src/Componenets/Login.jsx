/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'; 
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/users.slice.js";
import { useTranslation } from 'react-i18next';


const Login = () => {
	const navigator = useNavigate()
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const [user, setUser] = useState({ password: "", email: "" });
	const [passwordError, setPasswordError] = useState({ error: false, text: "" });
	const [emailError, setEmailError] = useState({ error: false, text: "" });
	const matches = useMediaQuery("(min-width:600px)");
	const { t, i18n } = useTranslation("translation", {keyPrefix: "loginPage"});

	const handleVisibility = () => setShowPassword(!showPassword)

	const handleChange = (event) => {
		switch (event.target.name) {
			case "password":
				let regPassword = /^[a-zA-Z0-9]{3,15}$/.test(event.target.value);
				if (event.target.value === "") {
					setPasswordError({ error: false, text: "" });
				} else if (regPassword) {
					setPasswordError({ error: false, text: "" });
				} else {
					setPasswordError({ error: true, text: t("incorrectPassword") });
				}
				break;
			case "email":
				let regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(event.target.value);
				if (event.target.value === "") {
					setEmailError({ error: false, text: "" });
				} else if (regEmail) {
					setEmailError({ error: false, text: "" });
				} else {
					setEmailError({ error: true, text: t("incorrectEmail") });
				}
				break;
		}
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const handleClick = (event) => {
		navigator("/register")
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		let res = await fetch("http://localhost:3001/users");
		let data = await res.json();
		let foundUser = data.find((singleUser) => singleUser.email === user.email && singleUser.password === user.password);
		if (!foundUser) {
			setEmailError({ error: true, text: "Invalid email or password" });
			return;
		}
		foundUser && dispatch(login(foundUser));
		navigator("/profile");
	};

	return (
		<div style={{width: "100%", display: "flex", alignItems: "center", flexDirection: "column", flex: 1, justifyContent: "center"}}>
			<Typography variant="h3" sx={{ marginBottom: "22px", textAlign: "center" }}>{t("login")}</Typography>
			<Box onSubmit={handleSubmit} component="form" sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2, width: {xs: '85%', sm: '65%', md: '65%', xl: "45%"} }}>
				<TextField error={emailError.error} id="email" name="email" type="email" label={t("email")} sx={{ width: "100%", "& label": { left: "inherit", right: i18n.language === "ar" ? "1.75rem" : "unset", transformOrigin: i18n.language === "ar" ? "right" : "left", fontSize: "14pt" }, "& legend": { textAlign: i18n.language === "ar" ? "right" : "left", fontSize: "12pt" }, "& .MuiInputBase-input": { textAlign: i18n.language === "ar" ? "right" : "left" }, "& .MuiFormHelperText-root": {direction: i18n.language == "ar" ? "rtl" : "ltr", textAlign: i18n.language == "ar" ? "right" : "left", fontSize: "12pt"} }} variant="outlined" value={user.email} onChange={handleChange} helperText={emailError.text} />
				<TextField error={passwordError.error} id="password" name="password" type={showPassword ? 'text' : 'password'} label={t("password")} sx={{ width: "100%", "& label": { left: "inherit", right: i18n.language === "ar" ? "1.75rem" : "unset", transformOrigin: i18n.language === "ar" ? "right" : "left", fontSize: "14pt" }, "& legend": { textAlign: i18n.language === "ar" ? "right" : "left", fontSize: "12pt" }, "& .MuiInputBase-input": { textAlign: i18n.language === "ar" ? "right" : "left" }, "& .MuiFormHelperText-root": {direction: i18n.language == "ar" ? "rtl" : "ltr", textAlign: i18n.language == "ar" ? "right" : "left", fontSize: "12pt"} }} variant="outlined" value={user.password} slotProps={{input: { endAdornment: (<InputAdornment position="end" sx={{cursor: "pointer"}} onClick={handleVisibility}>{showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}</InputAdornment>),},}} onChange={handleChange} helperText={passwordError.text} />
				<Typography variant="a" onClick={handleClick} sx={{ marginBottom: "22px", textAlign: "center" , cursor: "pointer", "&:hover":{color:"blue", textDecoration: "underline"}}}>{t("noAccount")}</Typography>
				<Button type="submit" sx={{ display: "flex", gap: i18n.language == "ar" ? "16px" : "10px" , alignSelf: "center", padding: "12px 24px"}} variant="contained" startIcon={<LoginIcon/>}>{t("login")}</Button>
			</Box>
		</div>
	);
};

export default Login;


// input in MUI doesn't change direction for the label from english but if i want to change it from english to arabic either create Theme or change it manual in sx as AI Did.
// it holden the label and changed the left to inherit, then about right > i set it like that because when AI fixed it to me it fixed the arabic one so it hard coded the right which is not good so i made i18n based on the language it set right or not, then it holden the legend and changed the text align of the legend to right and holden the input class and changed the alignment to right but i changed it to let i18n decide based on the language i am using and about helper text it did the same and i added the i18n.
// sx={{ width: "100%", "& label": { left: "inherit", right: i18n.language === "ar" ? "1.75rem" : "unset", transformOrigin: i18n.language === "ar" ? "right" : "left" }, "& legend": { textAlign: i18n.language === "ar" ? "right" : "left" }, "& .MuiInputBase-input": { textAlign: i18n.language === "ar" ? "right" : "left" }, "& .MuiFormHelperText-root": {direction: i18n.language == "ar" ? "rtl" : "ltr", textAlign: i18n.language == "ar" ? "right" : "left"} }}