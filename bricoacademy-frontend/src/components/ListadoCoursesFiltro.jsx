import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
	Stack,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";

export default function ListadoCoursesFiltro() {
	const [datos, setDatos] = useState([]);
	const [error, setError] = useState(null);

	// "" = todos, "1" = online, "0" = presencial
	const [filtroOnline, setFiltroOnline] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchCourses() {
			try {
				let url = "/courses/";
				if (filtroOnline !== "") {
					url += "?online=" + filtroOnline;
				}

				const respuesta = await api.get(url);
				setDatos(respuesta.datos);
				setError(null);
			} catch (error) {
				setError(error.mensaje || "Error al cargar cursos");
				setDatos([]);
			}
		}

		fetchCourses();
	}, [filtroOnline]);

	async function handleDelete(id_course) {
		try {
			await api.delete("/courses/" + id_course);
			const datos_nuevos = datos.filter((c) => c.id_course !== id_course);
			setDatos(datos_nuevos);
			setError(null);
		} catch (error) {
			setError(error.mensaje || "No se pudo conectar al servidor");
			setDatos([]);
		}
	}

	if (error != null) {
		return (
			<Typography variant='h5' align='center' sx={{ mt: 3 }}>
				{error}
			</Typography>
		);
	}

	return (
		<>
			<Typography variant='h4' align='center' sx={{ my: 3 }}>
				Cursos (Online / Presencial)
			</Typography>

			{/* SELECT FILTRO */}
			<FormControl sx={{ minWidth: 220, mb: 3 }}>
				<InputLabel>Modalidad</InputLabel>
				<Select
					value={filtroOnline}
					label='Modalidad'
					onChange={(e) => setFiltroOnline(e.target.value)}>
					<MenuItem value=''>Todos</MenuItem>
					<MenuItem value='1'>Online</MenuItem>
					<MenuItem value='0'>Presencial</MenuItem>
				</Select>
			</FormControl>

			{/* MENSAJE SI NO HAY */}
			{(!datos || datos.length === 0) && (
				<Typography variant='h5' align='center' sx={{ mt: 3 }}>
					No hay cursos disponibles
				</Typography>
			)}

			{/* TABLA */}
			{datos && datos.length > 0 && (
				<TableContainer component={Paper}>
					<Table stickyHeader aria-label='courses table'>
						<TableHead>
							<TableRow>
								<TableCell>Nombre</TableCell>
								<TableCell align='center'>Online</TableCell>
								<TableCell align='center'>Inicio</TableCell>
								<TableCell align='center'>Duración</TableCell>
								<TableCell align='center'>Precio</TableCell>
								<TableCell>Imagen</TableCell>
								<TableCell align='center'>Acciones</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{datos.map((row) => (
								<TableRow key={row.id_course}>
									<TableCell>{row.name}</TableCell>
									<TableCell align='center'>
										{row.online ? "Sí" : "No"}
									</TableCell>
									<TableCell align='center'>
										{row.start_date}
									</TableCell>
									<TableCell align='center'>
										{row.duration} h
									</TableCell>
									<TableCell align='center'>
										{row.price} €
									</TableCell>
									<TableCell>
										<Avatar
											alt={row.name}
											src={row.image_url}
										/>
									</TableCell>
									<TableCell align='center'>
										<Stack
											direction={{
												xs: "column",
												sm: "row",
											}}
											spacing={1}
											justifyContent='center'
											alignItems='center'>
											<Button
												variant='contained'
												color='error'
												onClick={() =>
													handleDelete(row.id_course)
												}>
												<DeleteIcon />
											</Button>

											<Button
												variant='contained'
												color='primary'
												onClick={() =>
													navigate(
														"/courses/edit/" +
															row.id_course,
													)
												}>
												<EditIcon />
											</Button>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
}
