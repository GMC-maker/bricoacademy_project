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

export default function Teachers() {
	const [datos, setDatos] = useState([]);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchTeachers() {
			try {
				const respuesta = await api.get("/teachers/");
				setDatos(respuesta.datos);
				setError(null);
			} catch (error) {
				setError(error.mensaje || "Error al cargar profesores");
				setDatos([]);
			}
		}
		fetchTeachers();
	}, []);

	//para borrar los registros:
	async function handleDelete(id_teacher) {
		//mensaje de seguridad si quiero borrar:
		if (!window.confirm("¿Seguro que quieres borrar este profesor?"))
			return;

		try {
			await api.delete("/teachers/" + id_teacher);
			const datos_nuevos = datos.filter(
				(t) => t.id_teacher !== id_teacher,
			);
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
				No hay profesores disponibles
			</Typography>
		);
	}

	return (
		<>
			<Typography variant='h4' align='center' sx={{ my: 3 }}>
				Listado de profesores
			</Typography>
			<Stack
				className='no-print'
				direction='row'
				spacing={2}
				justifyContent='end'
				sx={{ mb: 2 }}>
				<Button variant='outlined' onClick={() => window.print()}>
					Imprimir
				</Button>
			</Stack>

			<div className='print-area'>
				<TableContainer component={Paper}>
					<TableContainer component={Paper}>
						<Table stickyHeader aria-label='teachers table'>
							<TableHead>
								<TableRow>
									<TableCell>Nombre</TableCell>
									<TableCell>DNI</TableCell>
									<TableCell>Email</TableCell>
									<TableCell align='center'>Estado</TableCell>
									<TableCell align='center'>Activo</TableCell>
									<TableCell>Foto</TableCell>
									<TableCell
										align='center'
										className='no-print'>
										Acciones
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{datos.map((row) => (
									<TableRow key={row.id_teacher}>
										<TableCell>{row.fullname}</TableCell>
										<TableCell>{row.dni}</TableCell>
										<TableCell>{row.email}</TableCell>
										<TableCell align='center'>
											{row.status}
										</TableCell>
										<TableCell align='center'>
											{row.active ? "Sí" : "No"}
										</TableCell>
										<TableCell>
											<Avatar
												alt={row.fullname}
												src={row.image_url}
											/>
										</TableCell>
										<TableCell
											align='center'
											className='no-print'>
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
														handleDelete(
															row.id_teacher,
														)
													}>
													<DeleteIcon />
												</Button>

												<Button
													variant='contained'
													color='primary'
													onClick={() =>
														navigate(
															"/teachers/edit/" +
																row.id_teacher,
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
				</TableContainer>
			</div>
		</>
	);
}
