import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, updateCourse, deleteCourse, fetchCourses } from "../redux/slices/courseSlice.js";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import styles from "../Styles/admin.module.css";
import { useTranslation } from "react-i18next";



export default function AdminPage() {
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.course.courses);
	const [data, setData] = useState([])
	const error = useSelector((state) => state.course.error);
	const [form, setForm] = useState({ title: "", description: "", longDescription: "", level: "Beginner", duration: "", lessons: "", price: "", topics: "" });
	const [editing, setEditing] = useState(null);
	const [open, setOpen] = useState(false);
	const { t } = useTranslation("translation", {keyPrefix: "adminPage"});

	useEffect(() => {
		async function getData(){
			dispatch(fetchCourses());
			setData(courses)
		}
		getData()
	}, [dispatch, courses]);

	async function refreshData() {
		dispatch(fetchCourses());
		setData(courses)
	}

	function handleChange(e) {
		setForm((a) => ({ ...a, [e.target.name]: e.target.value }));
	}

	function openAdd() {
		setForm({ title: "", description: "", longDescription: "", level: "Beginner", duration: "", lessons: "", price: "", topics: "" });
		setEditing(null);
		setOpen(true);
	}

	function openEdit(course) {
		setForm({ ...course, topics: course.topics.join(", ") });
		setEditing(course.id);
		setOpen(true);
	}

	function handleCancel() {
		setOpen(false);
		setEditing(null);
		setForm({ title: "", description: "", longDescription: "", level: "Beginner", duration: "", lessons: "", price: "", topics: "" });
	}

	function handleSubmit() {
		const payload = { ...form, lessons: Number(form.lessons), price: Number(form.price), topics: form.topics.split(",").map((t) => t.trim()).filter(Boolean) };
		editing !== null ? dispatch(updateCourse({ ...payload, id: editing })) : dispatch(addCourse(payload));
		handleCancel();
	}

	function handleDelete(id) {
		if (confirm("Do you want to delete this course?")) dispatch(deleteCourse(id));
		refreshData();
	}

	return (
		<Box className={styles.page} sx={{width: "100%"}}>
			<Box className={styles.topBar}>
				<Typography variant="h4" sx={{ color: "#ffd700", fontWeight: 800 }}>
					{t("course")}
				</Typography>
				<Button variant="contained" onClick={openAdd} sx={{ background: "#ffd700", color: "#000", fontWeight: 700, "&:hover": { background: "#e6c200" } }}>
					{t("addNewCourse")}
				</Button>
			</Box>

			{error && (
				<Box className={styles.errorWrap}>
					<Alert severity="error" sx={{ background: "#2a0a0a", color: "#ff4d4d", border: "1px solid #ff4d4d" }}>
						{t("warning")}
					</Alert>
				</Box>
			)}

			<Box className={styles.layout} sx={{width: "100%"}}>
				<TableContainer className={styles.tableWrap} sx={{ background: "#13131a" }}>
					<Table sx={{width: "100%"}} align="center">
						<TableHead sx={{ background: "#0f0f18" }}>
							<TableRow >
								{[t("course"), t("level"), t("price"), t("metadata"), t("actions")].map((col) => (
									<TableCell align="center" key={col} sx={{ color: "#ffd700", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: "1px solid #222" }}>
										{col}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{data.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} align="center" sx={{ color: "#555", py: 6, borderBottom: "none" }}>
										{t("noCourse")}
									</TableCell>
								</TableRow>
							) : (
								data.map((course) => (
									<TableRow key={course.id} sx={{ "&:hover": { background: "#16161f" }, transition: "background 0.15s" }}>
										<TableCell sx={{ borderBottom: "1px solid #1e1e2e" }} align="center">
											<Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{course.title}</Typography>
											<Typography sx={{ color: "#555", fontSize: "0.8rem" }}>{course.description?.slice(0, 55)}…</Typography>
										</TableCell>

										<TableCell sx={{ borderBottom: "1px solid #1e1e2e" }} align="center">
											<Typography sx={{ color: "#ffd700", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{course.level}</Typography>
										</TableCell>

										<TableCell sx={{ borderBottom: "1px solid #1e1e2e" }} align="center">
											<Typography sx={{ color: "#ffd700", fontWeight: 700 }}>${course.price}</Typography>
										</TableCell>

										<TableCell sx={{ borderBottom: "1px solid #1e1e2e" }} align="center">
											<Typography sx={{ color: "#555", fontSize: "0.8rem" }}>{course.duration}</Typography>
											<Typography sx={{ color: "#555", fontSize: "0.8rem" }}>{course.lessons} lessons</Typography>
										</TableCell>

										<TableCell sx={{ borderBottom: "1px solid #1e1e2e" }} align="center">
											<Box className={styles.actions}>
												<Button size="small" variant="outlined" onClick={() => openEdit(course)} sx={{ borderColor: "#444", color: "#ccc", "&:hover": { borderColor: "#ffd700", color: "#ffd700" } }}>
													{t("edit")}
												</Button>
												<Button size="small" variant="outlined" onClick={() => handleDelete(course.id)} sx={{ borderColor: "#3a1a1a", color: "#ff4d4d", "&:hover": { background: "#ff4d4d", color: "#000", borderColor: "#ff4d4d" } }}>
													{t("delete")}
												</Button>
											</Box>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>

				{open && (
					<Paper elevation={0} sx={{borderRadius: "14px", border: "1px solid #222",  padding: "28px", position: "sticky", top: "24px", display: "flex", flexDirection: "column", gap: "20px", bgcolor: "black"}}>
						<Typography variant="h6" sx={{ color: "#fff", mb: -1, fontWeight: 700 }}>
							{editing !== null ? t("editCourse") : t("newCourse")}
						</Typography>

						<TextField label="Title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. React Mastery" fullWidth sx={{ "& .MuiOutlinedInput-root": { background: "#0a0a0f", color: "#fff", "& fieldset": { borderColor: "#2a2a3a" }, "&:hover fieldset": { borderColor: "#555" }, "&.Mui-focused fieldset": { borderColor: "#ffd700" }}, "& .MuiInputLabel-root": { color: "#888" }, "& .MuiInputLabel-root.Mui-focused": { color: "#ffd700" }}} />

						<TextField label="Short Description" name="description" value={form.description} onChange={handleChange} placeholder="One-line summary" fullWidth sx={{ "& .MuiOutlinedInput-root": { background: "#0a0a0f", color: "#fff", "& fieldset": { borderColor: "#2a2a3a" }, "&:hover fieldset": { borderColor: "#555" }, "&.Mui-focused fieldset": { borderColor: "#ffd700" }}, "& .MuiInputLabel-root": { color: "#888" }, "& .MuiInputLabel-root.Mui-focused": { color: "#ffd700" }}} />

						<TextField label="Long Description" name="longDescription" value={form.longDescription} onChange={handleChange} placeholder="Full course description..." multiline minRows={3} fullWidth sx={{ "& .MuiOutlinedInput-root": { background: "#0a0a0f", color: "#fff", "& fieldset": { borderColor: "#2a2a3a" }, "&:hover fieldset": { borderColor: "#555" }, "&.Mui-focused fieldset": { borderColor: "#ffd700" }}, "& .MuiInputLabel-root": { color: "#888" }, "& .MuiInputLabel-root.Mui-focused": { color: "#ffd700" }}} />

						<Box className={styles.row}>
							<FormControl fullWidth>
								<InputLabel sx={{ color: "#888", "&.Mui-focused": { color: "#ffd700" } }}>{t("level")}</InputLabel>
								<Select name="level" value={form.level} label="Level" onChange={handleChange} sx={{ background: "#0a0a0f", color: "#fff", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2a2a3a" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#555" }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ffd700" }, "& .MuiSvgIcon-root": { color: "#888" } }} MenuProps={{ PaperProps: { sx: { background: "#13131a", color: "#fff" } } }}>
									<MenuItem value="Beginner">{t("beginner")}</MenuItem>
									<MenuItem value="Intermediate">{t("intermediate")}</MenuItem>
									<MenuItem value="Advanced">{t("advanced")}</MenuItem>
								</Select>
							</FormControl>

							<TextField label="Price ($)" name="price" type="number" value={form.price} onChange={handleChange} placeholder="49" inputProps={{ min: 0 }} sx={{ "& .MuiOutlinedInput-root": { background: "#0a0a0f", color: "#fff", "& fieldset": { borderColor: "#2a2a3a" }, "&:hover fieldset": { borderColor: "#555" }, "&.Mui-focused fieldset": { borderColor: "#ffd700" }}, "& .MuiInputLabel-root": { color: "#888" }, "& .MuiInputLabel-root.Mui-focused": { color: "#ffd700" }}} />
						</Box>

						<Box className={styles.column}>
							<TextField label="Duration" name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 30m" sx={{ "& .MuiOutlinedInput-root": { background: "#0a0a0f", color: "#fff", "& fieldset": { borderColor: "#2a2a3a" }, "&:hover fieldset": { borderColor: "#555" }, "&.Mui-focused fieldset": { borderColor: "#ffd700" }}, "& .MuiInputLabel-root": { color: "#888" }, "& .MuiInputLabel-root.Mui-focused": { color: "#ffd700" }, flex: 1}} />
							<TextField label="Lessons" name="lessons" type="number" value={form.lessons} onChange={handleChange} placeholder="24" inputProps={{ min: 0 }} sx={{ "& .MuiOutlinedInput-root": { background: "#0a0a0f", color: "#fff", "& fieldset": { borderColor: "#2a2a3a" }, "&:hover fieldset": { borderColor: "#555" }, "&.Mui-focused fieldset": { borderColor: "#ffd700" }}, "& .MuiInputLabel-root": { color: "#888" }, "& .MuiInputLabel-root.Mui-focused": { color: "#ffd700" }}} />
						</Box>

						<Box>
							<TextField label="Topics" name="topics" value={form.topics} onChange={handleChange} placeholder="Hooks, Redux, Router, ..." fullWidth sx={{ "& .MuiOutlinedInput-root": { background: "#0a0a0f", color: "#fff", "& fieldset": { borderColor: "#2a2a3a" }, "&:hover fieldset": { borderColor: "#555" }, "&.Mui-focused fieldset": { borderColor: "#ffd700" }}, "& .MuiInputLabel-root": { color: "#888" }, "& .MuiInputLabel-root.Mui-focused": { color: "#ffd700" }}} />
							<Typography className={styles.topicsHint}>{t("comaSep")}</Typography>
						</Box>

						<Box className={styles.formActions}>
							<Button fullWidth variant="contained" onClick={handleSubmit} sx={{ background: "#ffd700", color: "#000", fontWeight: 800, py: 1.5, "&:hover": { background: "#e6c200" } }}>
								{editing !== null ? t("saveChange") : t("addCourse")}
							</Button>
							<Button variant="outlined" onClick={handleCancel} sx={{ borderColor: "#333", color: "#666", px: 3, py: 1.5, "&:hover": { borderColor: "#555", color: "#ccc" } }}>
								{t("cancel")}
							</Button>
						</Box>
					</Paper>
				)}
			</Box>
		</Box>
	);
}
