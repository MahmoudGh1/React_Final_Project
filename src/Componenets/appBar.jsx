/* eslint-disable no-unused-vars */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "../Styles/header.module.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { List, ListItem, useMediaQuery, Drawer } from "@mui/material";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export default function ButtonAppBar({ navLinks }) {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.users.currentUser);
	const matched = useMediaQuery("(max-width:1250px)");
	const [openDrawer, setOpenDrawer] = useState(false);
	const { i18n } = useTranslation();

	
	return (
		<Box sx={{ flexGrow: 1, width: "100%", display: "flex", justifyContent: "space-between" }}>
			<AppBar position="static">
				<Toolbar sx={{ display: "flex", backgroundColor: "white", color: "black", justifyContent: "space-between" }}>
					<Box className={styles.brand}>
						<a href="/home">GSH</a>
					</Box>
					{!matched && navLinks}
					{matched && (
						<>
							<IconButton onClick={() => setOpenDrawer(true)}>
								<MenuIcon fontSize="large" />
							</IconButton>
							<Drawer anchor= {i18n.language == "ar" ? "right" : "left"} open={openDrawer} onClose={() => setOpenDrawer(false)}>
								<Box sx={{ width: 250, paddingTop: "20px" }}>
									<IconButton onClick={() => setOpenDrawer(false)} sx={{ float: "right", marginRight: "10px" }}>
										<CloseIcon />
									</IconButton>
									{matched && navLinks}
								</Box>
							</Drawer>
						</>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
