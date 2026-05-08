import React from "react";
import styles from "../Styles/about.module.css";
import { Camera, Users, Award, PhoneCall } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
	const { t } = useTranslation("translation", { keyPrefix: "aboutPage" });

	return (
		<div className={`max-w-4xl mx-auto p-4 ${styles.aboutContainer}`}>
			<div className="text-center mb-10">
				<h1 className="text-4xl font-semibold mb-4">{t("contactUs")}</h1>
				<p>{t("hook")}</p>
			</div>
			<section className={`mb-10 ${styles.aboutus}`}>
				<h2 className="text-3xl font-semibold mb-4">{t("ourStory")}</h2>
				<img src="/Gemini_Generated_Image_vic59svic59svic5.png" alt="Our story image" className="mb-2" />
				<p className={styles.paragraph}>{t("story")}</p>
			</section>
			<section className="mb-10">
				<h2 className="text-3xl font-semibold mb-4">{t("meetTeam")}</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					<div className="flex flex-col items-center text-center">
						<Camera className="w-12 h-12 mb-2" />
						<p className="font-semibold">Alex Doe</p>
						<p>Photographer</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<Users className="w-12 h-12 mb-2" />
						<p className="font-semibold">Jamie Smith</p>
						<p>HR Manager</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<Award className="w-12 h-12 mb-2" />
						<p className="font-semibold">Sara Connor</p>
						<p>Quality Assurance</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<PhoneCall className="w-12 h-12 mb-2" />
						<p className="font-semibold">John Doe</p>
						<p>Customer Support</p>
					</div>
				</div>
			</section>
			<section className="mb-10">
				<h2 className="text-3xl font-semibold mb-4">{t("ourMission")}</h2>
				<p>{t("mission")}</p>
			</section>
			<section>
				<h2 className="text-3xl font-semibold mb-4">{t("cta")}</h2>
				<p>{t("ctaDesc")}</p>
				<button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">{t("contactUs")}</button>
			</section>
		</div>
	);
};

export default ContactUs;
