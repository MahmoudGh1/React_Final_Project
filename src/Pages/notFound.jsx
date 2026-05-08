import React from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate("/home");
	};
	const { t } = useTranslation("translation", {keyPrefix: "notFoundPage"});

	return (
		<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
			<h1 style={{textAlign: "center", padding: "10px", fontSize: "32pt", fontWeight: "bold"}}>{t("notFound")}</h1>
			<img src="/notfound.png" alt="" style={{ width: "80%", margin: "0 auto", borderRadius: "13px", border: "3px solid black" }} />
			<button onClick={handleNavigate} style={{ position: 'absolute', bottom: '155px', right: '26%', opacity: '0', padding: "12px 24px", backgroundColor: "dodgerblue", borderRadius: "13px", width: "14%", alignSelf: "center", cursor: "pointer", border: "3px solid black" }}>
				{t("backHome")}
			</button>
		</div>
	);
};

export default NotFound;
