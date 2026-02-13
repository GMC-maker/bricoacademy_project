/**
 * @module components/EditarTeacher
 * @description Formulario para editar la información de un profesor.
 */
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

/**
 * Componente `EditarTeacher`.
 *
 * Edita la información de un profesor existente identificado por `id_teacher`.
 * - Carga el profesor por id y muestra un formulario similar al de alta.
 * - Observa `isUpdating` para enviar `PUT /teachers/:id` con los cambios.
 *
 * Handlers importantes:
 * - `fetchTeacher()`: carga los datos iniciales del profesor.
 * - `handleChange(e)`: actualiza el estado `teacher` (convierte numéricos).
 * - `validarDatos()`: valida todos los campos antes de enviar.
 */
export default function EditarTeacher() {
	const navigate = useNavigate();
	const { id_teacher } = useParams();

	const [teacher, setTeacher] = useState({
		dni: "",
		fullname: "",
		email: "",
		active: 1,
		status: "ALTA",
		teaching_hours: 0,
		hourly_rate: 0,
		hire_date: "",
		image_url: "",
	});

	const [isCamposValidos, setIsCamposValidos] = useState({
		dni: true,
		fullname: true,
		email: true,
		status: true,
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
	 * Efecto que recupera los datos del profesor por id.
	 * En caso de error muestra un diálogo con el mensaje de fallo.
	 */
	useEffect(() => {
		async function fetchTeacher() {
			try {
				const respuesta = await api.get(`/teachers/${id_teacher}`);
				setTeacher(respuesta.datos);
			} catch (error) {
				setDialogMessage(
					error.mensaje || "Error al recuperar el profesor",
				);
				setDialogSeverity("error");
				setOpenDialog(true);
			}
		}
		fetchTeacher();
	}, [id_teacher]);

	/**
	 * Efecto que observa `isUpdating` y realiza la petición de actualización
	 * `PUT /teachers/:id` cuando se pide guardar los cambios.
	 */
	useEffect(() => {
		async function fetchUpdateTeacher() {
			try {
				await api.put(`/teachers/${id_teacher}`, teacher);

				setDialogMessage("Actualización correcta del profesor");
				setDialogSeverity("success");
				setOpenDialog(true);
			} catch (error) {
				setDialogMessage(
					error.mensaje || "Error al actualizar el profesor",
				);
				setDialogSeverity("error");
				setOpenDialog(true);
			}
			setIsUpdating(false);
		}

		if (isUpdating) fetchUpdateTeacher();
	}, [isUpdating]);

	function handleChange(e) {
		const { name, value } = e.target;

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

	function handleClick() {
		if (isUpdating) return;

		if (validarDatos()) setIsUpdating(true);
	}

	function handleDialogClose() {
		setOpenDialog(false);
		if (dialogSeverity === "success") navigate("/teachers");
	}

	function validarDatos() {
		let valido = true;
		const v = {
			dni: true,
			fullname: true,
			email: true,
			status: true,
			teaching_hours: true,
			hourly_rate: true,
			hire_date: true,
			image_url: true,
		};

		const dniOk = /^[0-9]{8}[A-Za-z]$/.test(
			String(teacher.dni || "").trim(),
		);
		if (!dniOk) {
			valido = false;
			v.dni = false;
		}

		if (String(teacher.fullname || "").trim().length < 3) {
			valido = false;
			v.fullname = false;
		}

		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
			String(teacher.email || "").trim(),
		);
		if (!emailOk) {
			valido = false;
			v.email = false;
		}

		if (!teacher.hire_date) {
			valido = false;
			v.hire_date = false;
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

		// status: ALTA / PERMISO / BAJA
		const statusOk = ["ALTA", "PERMISO", "BAJA"].includes(
			String(teacher.status || "").toUpperCase(),
		);
		if (!statusOk) {
			valido = false;
			v.status = false;
		}

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
							Editar profesor
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
									value={teacher.dni || ""}
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
									value={teacher.fullname || ""}
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
									value={teacher.email || ""}
									onChange={handleChange}
									error={!isCamposValidos.email}
									helperText={
										!isCamposValidos.email &&
										"Email no válido"
									}
								/>
							</Grid>

							<Grid item xs={10}>
								<TextField
									select
									required
									fullWidth
									label='Estado'
									name='status'
									value={teacher.status || "ALTA"}
									onChange={(e) =>
										setTeacher({
											...teacher,
											status: e.target.value.toUpperCase(),
										})
									}
									error={!isCamposValidos.status}
									helperText={
										!isCamposValidos.status &&
										"Selecciona un estado válido"
									}>
									<MenuItem value='ALTA'>ALTA</MenuItem>
									<MenuItem value='PERMISO'>PERMISO</MenuItem>
									<MenuItem value='BAJA'>BAJA</MenuItem>
								</TextField>
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
									label='Horas lectivas'
									name='teaching_hours'
									type='number'
									value={teacher.teaching_hours ?? 0}
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
									value={teacher.hourly_rate ?? 0}
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
									value={teacher.image_url || ""}
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
