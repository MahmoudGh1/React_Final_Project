// import React, { useEffect } from "react";
// import styles from "../Styles/header.module.css";
// import { Link } from "react-router";

// export default function FCHeader() {

// 	return (
// 		<div className={styles.divContainer}>
// 			<div className={styles.brand}>
// 				<a href="#">GSHAcademy</a>
// 			</div>
// 			<ul>
// 				<li>
// 					<Link to="/home">Home</Link>
// 				</li>
// 				<li>
// 					<Link to="/courses">Courses</Link>
// 				</li>
// 				<li>
// 					<Link to="/aboutus">About</Link>
// 				</li>
// 				<li>
// 					<Link to="/contactus">Contact Us</Link>
// 				</li>
// 			</ul>
// 		</div>
// 	);
// }

import React, { useState } from "react";
import styles from "../Styles/header.module.css";
import { Link } from "react-router";
import { Box, Typography, Button, List, ListItem, useMediaQuery, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/users.slice";
import ButtonAppBar from "./appBar";
import { useTranslation } from 'react-i18next';


export default function FCHeader() {
	console.log("Enter Header");
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.users.currentUser);
	const matched = useMediaQuery("(max-width:1250px)");
	// eslint-disable-next-line no-unused-vars
	const [openDrawer, setOpenDrawer] = useState(false);

	const { t, i18n } = useTranslation();

	function toggle() {
		const next = i18n.language === "ar" ? "en" : "ar";
		i18n.changeLanguage(next);
		document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
		document.documentElement.lang = next;
	}

	const navLinks = (
		<List sx={{ display: "flex" }} className={matched ? styles.navListMobile : styles.navList}>
			<ListItem>
				<Link to="/home" onClick={() => setOpenDrawer(false)}>
					{t('navigation.home')}
				</Link>
			</ListItem>
			<ListItem>
				<Link to="/courses" onClick={() => setOpenDrawer(false)}>
					{t('navigation.courses')}
				</Link>
			</ListItem>
			<ListItem>
				<Link to="/aboutus" onClick={() => setOpenDrawer(false)}>
					{t('navigation.about')}
				</Link>
			</ListItem>
			<ListItem>
				<Link style={{ minWidth: "100px" }} to="/contactus" onClick={() => setOpenDrawer(false)}>
					{t('navigation.contactus')}
				</Link>
			</ListItem>
			<ListItem>
				{currentUser ? (
					<Box sx={{display: "flex", gap: 3, alignItems: "center", flexDirection: matched ? "column" : "row"}}>
						<Link to="/profile" onClick={() => setOpenDrawer(false)}>
							{t('navigation.profile')}
						</Link>
						<Typography sx={{fontSize: "18.27px", fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"}}>{currentUser.username}</Typography>
					</Box>
				) : (
					<Link to="/login" onClick={() => setOpenDrawer(false)}>
						<Button variant="contained">{t('navigation.login')}</Button>
					</Link>
				)}
			</ListItem>
			{currentUser && (
				<ListItem>
					<Link to="/" onClick={() => setOpenDrawer(false)}>
						<Button variant="contained" onClick={() => dispatch(logout())}>
							{t('navigation.Logout')}
						</Button>
					</Link>
				</ListItem>
			)}
			<ListItem>
				<button onClick={toggle} style={{ background: "none", border: "1px solid black", color: "black", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: "12pt" }}>
					{i18n.language === "ar" ? "EN" : "عربى"}
				</button>
			</ListItem>
		</List>
	);

	console.log("Leave Header");
	return (
		<Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
			{matched && (
				<>
					<ButtonAppBar navLinks={navLinks}></ButtonAppBar>
				</>
			)}
			{!matched && <ButtonAppBar navLinks={navLinks}></ButtonAppBar>}
		</Box>
	);
}
