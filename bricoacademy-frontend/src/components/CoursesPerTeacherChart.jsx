/**
 * @module components/CoursesPerTeacherChart
 * @description Gráfica de cursos por profesor con exportación a PDF.
 */
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Typography from "@mui/material/Typography";

import api from "../api"; // ajusta la ruta si es necesario
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Cell,
} from "recharts";

/**
 * Componente `CoursesPerTeacherChart`.
 *
 * Muestra una gráfica de barras con el número de cursos por profesor.
 * - Realiza una petición a la API en el endpoint `/stats/courses-per-teacher`.
 * - Usa `recharts` para dibujar la gráfica.
 * - Permite exportar la sección visible como PDF mediante `html2canvas` y `jspdf`.
 *
 * Estado local:
 * - `data`: array con los datos que alimentan la gráfica (cada elemento: { profesor, totalCursos, ... }).
 * - `loading`: booleano que indica si se están cargando los datos.
 * - `error`: mensaje de error en caso de fallo de la llamada.
 *
 * Referencias:
 * - `chartRef`: referencia al contenedor que se captura para el PDF.
 */
export default function CoursesPerTeacherChart() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const chartRef = useRef(null);

	const COLORS = [
		"#4CAF50",
		"#2196F3",
		"#FF9800",
		"#9C27B0",
		"#F44336",
		"#009688",
	];

	/**
	 * Efecto de carga de datos.
	 * Llama a la API para obtener el número de cursos por profesor y actualiza el estado.
	 * Maneja `loading` y `error` para mostrar feedback en la UI.
	 */
	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);
				setError(null);

				// api.get YA devuelve response.data
				const response = await api.get("/stats/courses-per-teacher");

				// response = { ok: true, datos: [...] }
				setData(response.datos);
			} catch (err) {
				// err = { ok:false, mensaje:"..." }
				setError(err.mensaje || "Error cargando la gráfica");
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);

	if (loading) return <p>Cargando gráfica...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;
	/**
	 * handleDownloadPdf - captura la sección referenciada por `chartRef` como imagen
	 * y la inserta en un PDF A4 descargable.
	 *
	 * - Comprueba que `chartRef.current` exista antes de capturar.
	 * - Ajusta la escala para mejorar la calidad de la imagen.
	 */
	const handleDownloadPdf = async () => {
		if (!chartRef.current) return;

		// 1) Captura el div como imagen
		const canvas = await html2canvas(chartRef.current, {
			scale: 2, // más calidad
			useCORS: true,
			backgroundColor: "#ffffff",
		});

		const imgData = canvas.toDataURL("image/png");

		// 2) Crea PDF (A4)
		const pdf = new jsPDF("p", "mm", "a4");
		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = pdf.internal.pageSize.getHeight();

		// 3) Calcula tamaño manteniendo proporción
		const imgProps = pdf.getImageProperties(imgData);
		const imgWidth = pageWidth - 20; // margen
		const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

		// 4) Si la imagen es muy alta, la ajustamos
		const finalHeight = Math.min(imgHeight, pageHeight - 20);

		pdf.addImage(imgData, "PNG", 10, 10, imgWidth, finalHeight);

		pdf.save("grafica-cursos-por-profesor.pdf");
	};

	return (
		<Box sx={{ width: "100%" }}>
			{/* Esto es lo que se captura en el PDF */}
			<Box
				ref={chartRef}
				sx={{
					width: "100%",
					p: 2,
					borderRadius: 2,
					border: "1px solid #e0e0e0",
					backgroundColor: "#fff",
				}}>
				{/* Cabecera / marca */}
				<Box
					sx={{
						mb: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}></Box>

				{/* Título de la gráfica */}
				<Typography variant='h6' sx={{ mb: 1 }}>
					Cursos por profesor
				</Typography>

				{/* Contenedor de la gráfica */}
				<Box sx={{ width: "100%", height: 340 }}>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart data={data}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='profesor' />
							<YAxis allowDecimals={false} />
							<Tooltip />
							<Legend />
							<Bar dataKey='totalCursos' name='Total cursos'>
								{data.map((entry, index) => (
									<Cell
										key={index}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</Box>

				{/* Pie identificativo */}
				<Box
					sx={{
						mt: 1,
						display: "flex",
						justifyContent: "space-between",
					}}>
					<Typography variant='caption'>BricoAcademy</Typography>
					<Typography variant='caption'>
						{" "}
						{new Date().toLocaleDateString()}
					</Typography>
					<Typography variant='caption'>
						Informe generado desde la aplicación
					</Typography>
				</Box>
			</Box>

			{/* Botón fuera del ref */}
			<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
				<Button variant='contained' onClick={handleDownloadPdf}>
					Descargar PDF
				</Button>
			</Box>
		</Box>
	);
}
