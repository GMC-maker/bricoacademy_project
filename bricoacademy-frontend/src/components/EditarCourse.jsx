import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";

import api from "../api";

export default function EditarCourse() {
	const navigate = useNavigate();
	const { id_course } = useParams();

	const [teachers, setTeachers] = useState([]);

	const [course, setCourse] = useState({
		id_teacher: "",
		name: "",
		description: "",
		online: false,
		start_date: "",
		duration: 0,
		price: 0,
		image_url: "",
	});

	const [isCamposValidos, setIsCamposValidos] = useState({
		name: true,
		start_date: true,
		duration: true,
		price: true,
		image_url: true,
	});

	const [isUpdating, setIsUpdating] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [dialogMessage, setDialogMessage] = useState("");
	const [dialogSeverity, setDialogSeverity] = useState("success");

	useEffect(() => {
		async function fetchTeachers() {
			try {
				const r = await api.get("/teachers/");
				setTeachers(r.datos || []);
			} catch {
				setTeachers([]);
			}
		}
		fetchTeachers();
	}, []);

	useEffect(() => {
		async function fetchCourse() {
			try {
				const r = await api.get(`/courses/${id_course}`);
				// normalizo id_teacher a string para el select
				setCourse({
					...r.datos,
					id_teacher: r.datos?.id_teacher
						? String(r.datos.id_teacher)
						: "",
				});
			} catch (error) {
				setDialogMessage(
					error.mensaje || "Error al recuperar el curso",
				);
				setDialogSeverity("error");
				setOpenDialog(true);
			}
		}
		fetchCourse();
	}, [id_course]);

	useEffect(() => {
		async function fetchUpdateCourse() {
			try {
				const payload = {
					...course,
					id_teacher:
						course.id_teacher === ""
							? null
							: Number(course.id_teacher),
				};

				await api.put(`/courses/${id_course}`, payload);

				setDialogMessage("Actualización correcta del curso");
				setDialogSeverity("success");
				setOpenDialog(true);
			} catch (error) {
				setDialogMessage(
					error.mensaje || "Error al actualizar el curso",
				);
				setDialogSeverity("error");
				setOpenDialog(true);
			}
			setIsUpdating(false);
		}

		if (isUpdating) fetchUpdateCourse();
	}, [isUpdating]);

	function handleChange(e) {
		const { name, value } = e.target;

		if (name === "duration") {
			setCourse({
				...course,
				duration: value === "" ? "" : Number(value),
			});
			return;
		}
		if (name === "price") {
			setCourse({ ...course, price: value === "" ? "" : Number(value) });
			return;
		}
		if (name === "online") {
			setCourse({ ...course, online: value === "1" });
			return;
		}

		setCourse({ ...course, [name]: value });
	}

	function handleClick() {
		if (isUpdating) return;
		if (validarDatos()) setIsUpdating(true);
	}

	function handleDialogClose() {
		setOpenDialog(false);
		if (dialogSeverity === "success") navigate("/courses");
	}

	function validarDatos() {
		let valido = true;
		const v = {
			name: true,
			start_date: true,
			duration: true,
			price: true,
			image_url: true,
		};

		if (course.name.trim().length < 3) {
			valido = false;
			v.name = false;
		}

		if (!course.start_date) {
			valido = false;
			v.start_date = false;
		}

		if (course.duration === "" || Number(course.duration) < 0) {
			valido = false;
			v.duration = false;
		}

		if (course.price === "" || Number(course.price) < 0) {
			valido = false;
			v.price = false;
		}

		if (course.image_url?.trim() && !isValidURL(course.image_url.trim())) {
			valido = false;
			v.image_url = false;
		}

		setIsCamposValidos(v);
		return valido;
	}

	const isValidURL = (urlString) => {
		const patronURL = new RegExp(
			"^(https?:\\/\\/)?" +
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
				"((\\d{1,3}\\.){3}\\d{1,3}))" +
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
				"(\\?[;&a-z\\d%_.~+=-]*)?" +
				"(\\#[-a-z\\d_]*)?$",
			"i",
		);
		return !!patronURL.test(urlString);
	};

	return (
		<>
			<Grid
				container
				spacing={2}
				sx={{ justifyContent: "center", alignItems: "center" }}>
				<Grid item xs={12} md={6}>
					<Paper
						elevation={6}
						sx={{ mt: 3, p: 3, maxWidth: 900, mx: "auto" }}>
						<Typography variant='h4' align='center' sx={{ mb: 3 }}>
							Editar curso
						</Typography>

						<Grid
							container
							spacing={2}
							sx={{
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Grid item xs={12} md={6}>
								<TextField
									required
									fullWidth
									label='Nombre'
									name='name'
									value={course.name || ""}
									onChange={handleChange}
									error={!isCamposValidos.name}
									helperText={
										!isCamposValidos.name &&
										"Mínimo 3 caracteres"
									}
								/>
							</Grid>

							<Grid item xs={12} md={4}>
								<TextField
									fullWidth
									label='Descripción (opcional)'
									name='description'
									value={course.description || ""}
									onChange={handleChange}
									multiline
									minRows={3}
								/>
							</Grid>

							<Grid item xs={4} md={4}>
								<TextField
									select
									fullWidth
									label='Profesor (opcional)'
									name='id_teacher'
									value={course.id_teacher ?? ""}
									onChange={handleChange}>
									<MenuItem value=''>
										<em>Sin asignar</em>
									</MenuItem>
									{teachers.map((t) => (
										<MenuItem
											key={t.id_teacher}
											value={String(t.id_teacher)}>
											{t.fullname}
										</MenuItem>
									))}
								</TextField>
							</Grid>

							<Grid item xs={12} md={4}>
								<TextField
									select
									required
									fullWidth
									label='Modalidad'
									name='online'
									value={course.online ? "1" : "0"}
									onChange={handleChange}>
									<MenuItem value='1'>Online</MenuItem>
									<MenuItem value='0'>Presencial</MenuItem>
								</TextField>
							</Grid>

							<Grid item xs={12} md={4}>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
									adapterLocale='es'>
									<DatePicker
										label='Fecha de inicio'
										minDate={dayjs("2020-01-01")}
										slotProps={{
											textField: {
												required: true,
												fullWidth: true,
												error: !isCamposValidos.start_date,
												helperText:
													!isCamposValidos.start_date
														? "La fecha es obligatoria"
														: "",
											},
										}}
										value={
											course.start_date
												? dayjs(course.start_date)
												: null
										}
										onChange={(newValue) =>
											setCourse({
												...course,
												start_date: newValue
													? newValue.format(
															"YYYY-MM-DD",
														)
													: "",
											})
										}
									/>
								</LocalizationProvider>
							</Grid>

							<Grid item xs={12} md={6}>
								<TextField
									required
									fullWidth
									label='Duración (horas)'
									name='duration'
									type='number'
									value={course.duration ?? 0}
									onChange={handleChange}
									error={!isCamposValidos.duration}
									helperText={
										!isCamposValidos.duration &&
										"No puede ser negativo"
									}
									inputProps={{ min: 0 }}
								/>
							</Grid>

							<Grid item xs={12} md={4}>
								<TextField
									required
									fullWidth
									label='Precio (€)'
									name='price'
									type='number'
									value={course.price ?? 0}
									onChange={handleChange}
									error={!isCamposValidos.price}
									helperText={
										!isCamposValidos.price &&
										"No puede ser negativo"
									}
									inputProps={{ min: 0, step: "0.01" }}
								/>
							</Grid>

							<Grid item xs={12} md={4}>
								<TextField
									fullWidth
									label='URL Imagen (opcional)'
									name='image_url'
									value={course.image_url || ""}
									onChange={handleChange}
									error={!isCamposValidos.image_url}
									helperText={
										!isCamposValidos.image_url &&
										"URL no válida"
									}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sx={{
									display: "flex",
									gap: 2,
									justifyContent: "center",
									mt: 1,
								}}>
								<Button
									variant='contained'
									color='secondary'
									onClick={() => navigate("/courses")}>
									Cancelar
								</Button>
								<Button
									variant='contained'
									color='primary'
									onClick={handleClick}>
									Guardar cambios
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>

			<Dialog open={openDialog} onClose={handleDialogClose}>
				<DialogTitle>Resultado</DialogTitle>
				<DialogContent>
					<Alert severity={dialogSeverity}>{dialogMessage}</Alert>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>Aceptar</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
