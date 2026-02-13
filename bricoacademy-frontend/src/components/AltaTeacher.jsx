/**
 * @module components/AltaTeacher
 * @description Formulario para registrar un nuevo profesor.
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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

/**
 * Componente `AltaTeacher`.
 *
 * Formulario para dar de alta a un profesor. Gestiona el estado local del formulario
 * y realiza la petición `POST` a `/teachers/` cuando el usuario confirma.
 *
 * Estado principal (`teacher`):
 * - `dni` (string)
 * - `fullname` (string)
 * - `email` (string)
 * - `teaching_hours` (number)
 * - `hourly_rate` (number)
 * - `hire_date` (string, formato YYYY-MM-DD)
 * - `image_url` (string)
 */
export default function AltaTeacher() {
	const navigate = useNavigate();

	const [teacher, setTeacher] = useState({
		dni: "",
		fullname: "",
		email: "",
		teaching_hours: 0,
		hourly_rate: 0,
		hire_date: "",
		image_url: "",
	});

	const [isCamposValidos, setIsCamposValidos] = useState({
		dni: true,
		fullname: true,
		email: true,
		teaching_hours: true,
		hourly_rate: true,
		hire_date: true,
		image_url: true,
	});

	const [isUpdating, setIsUpdating] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [dialogMessage, setDialogMessage] = useState("");
	const [dialogSeverity, setDialogSeverity] = useState("success");

	/**
	 * useEffect que observa `isUpdating` y, cuando es true, realiza
	 * la petición para crear el profesor en el backend.
	 * - Actualiza `dialogMessage` y `dialogSeverity` según la respuesta.
	 */
	useEffect(() => {
		async function fetchCreateTeacher() {
			try {
				const respuesta = await api.post("/teachers/", teacher);

				setDialogMessage(
					respuesta.mensaje || "Profesor registrado correctamente",
				);
				setDialogSeverity("success");
				setOpenDialog(true);
			} catch (error) {
				setDialogMessage(error.mensaje || "Error al crear el profesor");
				setDialogSeverity("error");
				setOpenDialog(true);
			}
			setIsUpdating(false);
		}

		if (isUpdating) fetchCreateTeacher();
	}, [isUpdating]);

	/**
	 * handleChange - actualiza el estado `teacher` a partir de los inputs.
	 * Convierte a número los campos numéricos (`teaching_hours`, `hourly_rate`).
	 * @param {Event} e Evento de cambio del input
	 */
	function handleChange(e) {
		const { name, value } = e.target;

		// numéricos
		if (name === "teaching_hours") {
			setTeacher({
				...teacher,
				teaching_hours: value === "" ? "" : Number(value),
			});
			return;
		}
		if (name === "hourly_rate") {
			setTeacher({
				...teacher,
				hourly_rate: value === "" ? "" : Number(value),
			});
			return;
		}

		setTeacher({ ...teacher, [name]: value });
	}

	/**
	 * handleClick - validación previa y disparo del envío.
	 * Si los campos son válidos, marca `isUpdating` para que el efecto
	 * de creación envíe los datos al servidor.
	 */
	function handleClick() {
		if (isUpdating) return;

		if (validarDatos()) {
			setIsUpdating(true);
		}
	}

	/**
	 * handleDialogClose - cierra el diálogo de resultado. Si la operación fue
	 * exitosa (`dialogSeverity === 'success'`), navega al listado de profesores.
	 */
	function handleDialogClose() {
		setOpenDialog(false);
		if (dialogSeverity === "success") navigate("/teachers");
	}

	/**
	 * validarDatos - valida los campos del formulario `teacher`.
	 * Comprueba formato de DNI, longitud de nombre, email, valores numéricos
	 * no negativos, existencia de fecha y validez de URL si se proporciona.
	 * - Actualiza `isCamposValidos` con el resultado de cada campo.
	 * @returns {boolean} `true` si todos los campos son válidos.
	 */
	function validarDatos() {
		let valido = true;
		const v = {
			dni: true,
			fullname: true,
			email: true,
			teaching_hours: true,
			hourly_rate: true,
			hire_date: true,
			image_url: true,
		};

		// DNI simple (8 números + letra).
		const dniOk = /^[0-9]{8}[A-Za-z]$/.test(teacher.dni.trim());
		if (!dniOk) {
			valido = false;
			v.dni = false;
		}

		if (teacher.fullname.trim().length < 3) {
			valido = false;
			v.fullname = false;
		}

		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacher.email.trim());
		if (!emailOk) {
			valido = false;
			v.email = false;
		}

		if (
			teacher.teaching_hours === "" ||
			Number(teacher.teaching_hours) < 0
		) {
			valido = false;
			v.teaching_hours = false;
		}

		if (teacher.hourly_rate === "" || Number(teacher.hourly_rate) < 0) {
			valido = false;
			v.hourly_rate = false;
		}

		if (!teacher.hire_date) {
			valido = false;
			v.hire_date = false;
		}

		// image_url opcional, pero si viene, debe ser URL válida
		if (
			teacher.image_url?.trim() &&
			!isValidURL(teacher.image_url.trim())
		) {
			valido = false;
			v.image_url = false;
		}

		setIsCamposValidos(v);
		return valido;
	}

	/**
	 * isValidURL - valida si una cadena es una URL con formato aceptable.
	 * @param {string} urlString Cadena a validar como URL
	 * @returns {boolean} `true` si coincide con el patrón de URL
	 */
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
				<Grid item xs={12} sm={9} md={7}>
					<Paper
						elevation={6}
						sx={{ mt: 3, p: 3, maxWidth: 900, mx: "auto" }}>
						<Typography variant='h4' align='center' sx={{ mb: 3 }}>
							Alta de profesor
						</Typography>

						<Grid
							container
							spacing={2}
							sx={{
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Grid item xs={10}>
								<TextField
									required
									fullWidth
									label='DNI'
									name='dni'
									value={teacher.dni}
									onChange={handleChange}
									error={!isCamposValidos.dni}
									helperText={
										!isCamposValidos.dni &&
										"Formato: 12345678A"
									}
								/>
							</Grid>

							<Grid item xs={10}>
								<TextField
									required
									fullWidth
									label='Nombre completo'
									name='fullname'
									value={teacher.fullname}
									onChange={handleChange}
									error={!isCamposValidos.fullname}
									helperText={
										!isCamposValidos.fullname &&
										"Mínimo 3 caracteres"
									}
								/>
							</Grid>

							<Grid item xs={10}>
								<TextField
									required
									fullWidth
									label='Email'
									name='email'
									value={teacher.email}
									onChange={handleChange}
									error={!isCamposValidos.email}
									helperText={
										!isCamposValidos.email &&
										"Email no válido"
									}
								/>
							</Grid>

							<Grid item xs={10}>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
									adapterLocale='es'>
									<DatePicker
										label='Fecha de contratación'
										minDate={dayjs("1990-01-01")}
										maxDate={dayjs()}
										slotProps={{
											textField: {
												required: true,
												fullWidth: true,
												error: !isCamposValidos.hire_date,
												helperText:
													!isCamposValidos.hire_date
														? "La fecha es obligatoria"
														: "",
											},
										}}
										value={
											teacher.hire_date
												? dayjs(teacher.hire_date)
												: null
										}
										onChange={(newValue) =>
											setTeacher({
												...teacher,
												hire_date: newValue
													? newValue.format(
															"YYYY-MM-DD",
														)
													: "",
											})
										}
									/>
								</LocalizationProvider>
							</Grid>

							<Grid item xs={10}>
								<TextField
									required
									fullWidth
									label='Carga Horaria'
									name='teaching_hours'
									type='number'
									value={teacher.teaching_hours}
									onChange={handleChange}
									error={!isCamposValidos.teaching_hours}
									helperText={
										!isCamposValidos.teaching_hours &&
										"No puede ser negativo"
									}
									inputProps={{ min: 0 }}
								/>
							</Grid>

							<Grid item xs={10}>
								<TextField
									required
									fullWidth
									label='Tarifa por hora (€)'
									name='hourly_rate'
									type='number'
									value={teacher.hourly_rate}
									onChange={handleChange}
									error={!isCamposValidos.hourly_rate}
									helperText={
										!isCamposValidos.hourly_rate &&
										"No puede ser negativo"
									}
									inputProps={{ min: 0, step: "0.01" }}
								/>
							</Grid>

							<Grid item xs={10}>
								<TextField
									fullWidth
									label='URL Imagen (opcional)'
									name='image_url'
									value={teacher.image_url}
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
								xs={10}
								sx={{
									display: "flex",
									gap: 2,
									justifyContent: "center",
									mt: 1,
								}}>
								<Button
									variant='contained'
									color='secondary'
									onClick={() => navigate("/teachers")}>
									Cancelar
								</Button>
								<Button
									variant='contained'
									color='primary'
									onClick={handleClick}>
									Guardar
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>

			{/* Dialog */}
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
