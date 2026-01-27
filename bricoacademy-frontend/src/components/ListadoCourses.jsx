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
import { Stack } from "@mui/material";

export default function ListadoCourses() {
	const [datos, setDatos] = useState([]);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchCourses() {
			try {
				const respuesta = await api.get("/courses/");
				setDatos(respuesta.datos);
				setError(null);
			} catch (error) {
				setError(error.mensaje || "Error al cargar cursos");
				setDatos([]);
			}
		}
		fetchCourses();
	}, []);

	async function handleDelete(id_course) {
		if (!window.confirm("¿Seguro que quieres borrar este curso?")) return;
		
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

	if (!datos || datos.length === 0) {
		return (
			<Typography variant='h5' align='center' sx={{ mt: 3 }}>
				No hay cursos disponibles
			</Typography>
		);
	}

	return (
		<>
			<Typography variant='h4' align='center' sx={{ my: 3 }}>
				Listado de cursos
			</Typography>

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
										direction={{ xs: "column", sm: "row" }}
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
		</>
	);
}
