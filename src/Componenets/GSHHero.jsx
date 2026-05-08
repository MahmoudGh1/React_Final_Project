/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "../Styles/home.module.css";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { fetchCourses } from "../redux/slices/courseSlice.js";

const extensions = { G: "o", S: "mart", H: "ome" };

function getTransform(hoveredLetter, thisLetter) {
	if (!hoveredLetter) return "translateX(0)";
	const lettersObj = {
		G: { G: "-30px", S: "60px", H: "60px" },
		S: { G: "-190px", S: "-30px", H: "300px" },
		H: { G: "-80px", S: "-60px", H: "-30px" },
	};
	return `translateX(${lettersObj[hoveredLetter][thisLetter]})`;
}

function FloatingCircle({ img, size, style, animName, animDelay, duration }) {
	return (
		<Box className={styles.floatingCircle} style={{ width: size, height: size, animation: `${animName} ${duration} ease-in-out ${animDelay} infinite, ringGlow 3.5s ease-in-out ${animDelay} infinite`, ...style }}>
			<img src={`${img}`} alt="" className={styles.floatingCircleImg} />
		</Box>
	);
}

function HeroLetter({ letter, hovered, setHovered }) {
	const isActive = hovered === letter;

	return (
		<Box className={`${styles.heroLetter} ${isActive ? styles.heroLetterActive : ""}`} style={{ transform: getTransform(hovered, letter) }} onMouseEnter={() => setHovered(letter)} onMouseLeave={() => {setHovered(null)}}>
			<span className={`${styles.letterChar} ${isActive ? styles.letterCharActive : ""}`}>{letter}</span>

			{isActive && <span className={styles.letterExtension}>{extensions[letter]}</span>}
		</Box>
	);
}

export default function HeroSection() {
	const [hovered, setHovered] = useState(null);
	const currentUser = useSelector((state) => state.users.currentUser);
	const { t } = useTranslation("translation", {keyPrefix: "homePage"});
	const dispatch = useDispatch();
	const data = useSelector((state) => state.course.courses || []);

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);

	return (
		<Box className={styles.wrapper} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
			<img src="bg.gif" className={styles.bgImage} alt="Background image of a students in a lab doing scientific experimentation" />

			<Box className={styles.overlay} />

			<FloatingCircle img="img1.png" size={165} style={{ top: "7%", left: "5%" }} animName={styles.floatUp} duration="4.4s" animDelay="0s" />
			<FloatingCircle img="img2.png" size={210} style={{ top: "50%", left: "3%" }} animName={styles.floatDown} duration="5.6s" animDelay="0.5s" />
			<FloatingCircle img="img3.png" size={145} style={{ top: "13%", right: "5%" }} animName={styles.floatSway} duration="5.1s" animDelay="0.9s" />

			<Box className={styles.content}>
				<Box className={styles.lettersRow} style={{direction: "ltr"}}>
					{["G", "S", "H"].map((letter) => (
						// eslint-disable-next-line react-hooks/purity
						<HeroLetter key={`${letter}-${Math.random() * 10}`} letter={letter} hovered={hovered} setHovered={setHovered} />
					))}
				</Box>

				<Box className={styles.taglineRow}>
					<span className={styles.taglineText}>{t("academy")}</span>
				</Box>

				{ !currentUser && (
				
				<Box className={styles.buttons}>
					<Link to="/login">
						<button className={`${styles.heroBtn} ${styles.btnGhost}`}>{t("signin")}</button>
					</Link>
					<Link to="/register">
						<button className={`${styles.heroBtn} ${styles.btnSolid}`}>{t("createAccount")}</button>
					</Link>
				</Box>
				
				)}

				
			</Box>
		</Box>
	);
}
