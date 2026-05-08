/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import React, { useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'; 
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';

// https://www.tutorialpedia.org/blog/how-to-view-password-from-material-ui-textfield/
// https://mui.com/material-ui/react-text-field/#input-adornments
// https://mui.com/system/display/
// https://mui.com/material-ui/react-use-media-query/
// https://www.bing.com/search?qs=HS&pq=email+&sk=CSYN1AS13&sc=18-6&pglt=299&q=email+regular+expression+pattern&cvid=ea93e2a1d8bf49b59b7aafe29b1a5849&gs_lcrp=EgRlZGdlKgYIARAAGEAyBggAEEUYOTIGCAEQABhAMgYIAhBFGDsyBggDEAAYQDIGCAQQABhAMgYIBRBFGEEyBggGEEUYPDIGCAcQRRg8MgYICBBFGDzSAQg2NjM4ajBqN6gCALACAA&FORM=ANNTA1&PC=ASTS
// https://www.bing.com/search?qs=MT&pq=games+gen&sk=CSYN1&sc=13-9&pglt=299&q=games+genres&cvid=64ba54c4541645888c4277fd070d988e&gs_lcrp=EgRlZGdlKgYIARAAGEAyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBBFGD3SAQg0MDkwajBqN6gCALACAA&FORM=ANNTA1&PC=ASTS
// https://mui.com/material-ui/guides/minimizing-bundle-size/?_gl=1*1p64gwp*_up*MQ..*_ga*NzkwMjIwNTIxLjE3NzY5NTU0NDA.*_ga_5NXDQLC2ZK*czE3NzY5NTU0MzkkbzEkZzAkdDE3NzY5NTU0MzkkajYwJGwwJGgw

const Register = () => {
	const navigator = useNavigate()
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState({ username: "", password: "", email: "", gender: "", courses: [], role: "user" });
	const [userError, setUserError] = useState({ error: false, text: "" });
	const [passwordError, setPasswordError] = useState({ error: false, text: "" });
	const [emailError, setEmailError] = useState({ error: false, text: "" });
	const matches = useMediaQuery("(min-width:600px)");
	const { t } = useTranslation("translation", {keyPrefix: "registerPage"});

	const handleSubmit = async (event) => {
		event.preventDefault()
		let res = await fetch("http://localhost:3001/users", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(user)
		})

		navigator("/login")
	}

	const handleVisibility = () => setShowPassword(!showPassword)

	const handleChange = (event, x) => {
		switch (event.target.name) {
			case "username":
				let regName = /^[a-zA-Z]{3,}$/.test(event.target.value);
				if (event.target.value === "") {
					setUserError({ error: false, text: "" });
				} else if (regName) {
					setUserError({ error: false, text: "" });
				} else {
					setUserError({ error: true, text: "Name must consist of characters only, and minimum length 3..." });
				}
				break;
			case "password":
				let regPassword = /^[a-zA-Z0-9]{3,15}$/.test(event.target.value);
				if (event.target.value === "") {
					setPasswordError({ error: false, text: "" });
				} else if (regPassword) {
					setPasswordError({ error: false, text: "" });
				} else {
					setPasswordError({ error: true, text: "Password Must include both Numbers and Characters, and minimum length is 3, maximum 15." });
				}
				break;
			case "email":
				let regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(event.target.value);
				if (event.target.value === "") {
					setEmailError({ error: false, text: "" });
				} else if (regEmail) {
					setEmailError({ error: false, text: "" });
				} else {
					setEmailError({ error: true, text: "Please Write a valid email." });
				}
				break;
		}
		
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	return (
		<Box component="div" sx={{width: "100%", display: "flex", alignItems: "center", flexDirection: "column", flex: 1, justifyContent: "center"}}>
			{console.log(user)}
			<Typography variant="h3" sx={{ marginBottom: "22px", textAlign: "center" }}>
				{t("register")}
			</Typography>
			<Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2, width: {xs: '85%', sm: '65%', md: '65%', xl: "45%"} }}>
				<TextField required error={userError.error} name="username" id="username" type="text" label={t("username")} sx={{ width: "100%" }} variant="outlined" value={user.username} onChange={handleChange} helperText={userError.text} />
				<TextField required error={passwordError.error} id="password" name="password" type={showPassword ? 'text' : 'password'} label={t("password")} sx={{ width: "100%" }} variant="outlined" value={user.password} onChange={handleChange} helperText={passwordError.text} slotProps={{input: { endAdornment: (<InputAdornment position="end" sx={{cursor: "pointer"}} onClick={handleVisibility}>{showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}</InputAdornment>),},}} />
				<TextField required error={emailError.error} id="email" name="email" type="email" label={t("email")} sx={{ width: "100%" }} variant="outlined" value={user.email} onChange={handleChange} helperText={emailError.text} />
				<FormControl>
					<FormLabel>{t("gender")}</FormLabel>
					<RadioGroup required value={user.gender} name="gender" onChange={handleChange}>
						<FormControlLabel control={<Radio color="success"></Radio>} label={t("male")} value="Male"></FormControlLabel>
						<FormControlLabel control={<Radio color="success"></Radio>} label={t("female")} value="Female"></FormControlLabel>
					</RadioGroup>
				</FormControl>
                <TextField required multiline rows={6} sx={{width: "100%"}}></TextField>
				<Button type="submit" sx={{alignSelf: "center", padding: "12px 24px"}} variant="contained" startIcon={<HowToRegIcon/>}>{t("register")}</Button>
			</Box>
		</Box>
	);
};

export default Register;
