import { useState, useEffect, useMemo, useRef } from "react";
import api from "../api";

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
import ClearIcon from "@mui/icons-material/Clear";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useNavigate } from "react-router-dom";
import {
	Grid,
	Card,
	CardContent,
	Stack,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";

export default function ListadoTeachersFiltro() {
	const [datos, setDatos] = useState([]);
	const [error, setError] = useState(null);

	// filtro: "", "1", "0"
	const [filtroActivo, setFiltroActivo] = useState("");

	const navigate = useNavigate();
	const printRef = useRef(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const respuesta = await api.get("/teachers/");
				setDatos(respuesta.datos);
				setError(null);
			} catch (error) {
				setError(error.mensaje || "No se pudo conectar al servidor");
				setDatos([]);
			}
		}
		fetchData();
	}, []);

	const datosFiltrados = useMemo(() => {
		if (filtroActivo === "") return datos;
		const activoBool = filtroActivo === "1";
		return datos.filter((t) => Boolean(t.active) === activoBool);
	}, [datos, filtroActivo]);

	async function handleDelete(id_teacher) {
		try {
			await api.delete("/teachers/" + id_teacher);
			const datos_nuevos = datos.filter(
				(t) => t.id_teacher !== id_teacher,
			);
			setDatos(datos_nuevos);
			setError(null);
		} catch (error) {
			setError(error.mensaje || "No se pudo conectar al servidor");
		}
	}

	function limpiarFiltros() {
		setFiltroActivo("");
	}

	const handleDownloadPdf = async () => {
		if (!printRef.current) return;

		const canvas = await html2canvas(printRef.current, {
			scale: 2,
			useCORS: true,
			backgroundColor: "#ffffff",
		});

		const imgData = canvas.toDataURL("image/png");

		const pdf = new jsPDF("p", "mm", "a4");
		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = pdf.internal.pageSize.getHeight();

		const margin = 10;
		const imgWidth = pageWidth - margin * 2;

		// Alto en mm proporcional al ancho
		const imgHeight = (canvas.height * imgWidth) / canvas.width;

		let heightLeft = imgHeight;

		// Primera página: dibujamos la imagen completa, y luego “recortamos” con desplazamiento en páginas siguientes
		let position = margin;

		pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
		heightLeft -= pageHeight - margin * 2;

		while (heightLeft > 0) {
			pdf.addPage();
			position = margin - (imgHeight - heightLeft); // desplaza hacia arriba
			pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
			heightLeft -= pageHeight - margin * 2;
		}

		pdf.save("listado-profesores-filtrado.pdf");
	};

	if (error != null) {
		return (
			<>
				<Typography variant='h4' align='center' sx={{ my: 3 }}>
					Profesores con filtros
				</Typography>
				<Typography variant='h5' align='center' sx={{ mt: 3 }}>
					{error}
				</Typography>
			</>
		);
	}

	return (
		<>
			<Typography variant='h4' align='center' sx={{ my: 3 }}>
				Listado de profesores con filtros
			</Typography>

			{/* Botón fuera del ref para que NO salga en el PDF */}
			<Box
				className='no-print'
				sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
				<Button variant='contained' onClick={handleDownloadPdf}>
					Descargar PDF
				</Button>
			</Box>

			{/* todo lo que esté aquí dentro se exporta al PDF */}
			<Box
				ref={printRef}
				className='print-area'
				sx={{
					width: "100%",
					p: 2,
					borderRadius: 2,
					border: "1px solid #e0e0e0",
					backgroundColor: "#fff",
				}}>
				{/* Mini cabecera identificativa */}
				<Box
					sx={{
						mb: 1,
						display: "flex",
						justifyContent: "space-between",
					}}>
					<Typography variant='h6'>BricoAcademy</Typography>
					<Typography variant='body2'>
						{new Date().toLocaleDateString()}
					</Typography>
				</Box>

				{/* Tarjeta de filtros */}
				<Card sx={{ mb: 4 }}>
					<CardContent>
						<Typography variant='h6' sx={{ mb: 2 }}>
							Filtros
						</Typography>

						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<FormControl fullWidth>
									<InputLabel id='activo-label'>
										Activo
									</InputLabel>
									<Select
										labelId='activo-label'
										label='Activo'
										value={filtroActivo}
										onChange={(e) =>
											setFiltroActivo(e.target.value)
										}>
										<MenuItem value=''>Todos</MenuItem>
										<MenuItem value='1'>Activos</MenuItem>
										<MenuItem value='0'>Inactivos</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} md={6}>
								<Button
									variant='contained'
									color='secondary'
									onClick={limpiarFiltros}
									fullWidth
									startIcon={<ClearIcon />}
									sx={{ height: "100%" }}>
									Limpiar filtros
								</Button>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* Mensaje si no hay resultados */}
				{(!datosFiltrados || datosFiltrados.length === 0) && (
					<Typography variant='h5' align='center' sx={{ mt: 3 }}>
						No hay profesores para ese filtro
					</Typography>
				)}

				{/* Tabla */}
				{datosFiltrados && datosFiltrados.length > 0 && (
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
								{datosFiltrados.map((row) => (
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
				)}

				{/* Mini footer identificativo */}
				<Box
					sx={{
						mt: 2,
						display: "flex",
						justifyContent: "space-between",
					}}>
					<Typography variant='caption'>BricoAcademy</Typography>
					<Typography variant='caption'>
						Listado generado desde la aplicación
					</Typography>
				</Box>
			</Box>
		</>
	);
}
