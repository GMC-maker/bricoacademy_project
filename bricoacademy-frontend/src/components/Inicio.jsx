import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import bricolaje1 from "../assets/carousel/bricolaje1.jpg";
import bricolaje2 from "../assets/carousel/bricolaje2.jpg";
import bricolaje3 from "../assets/carousel/bricolaje3.jpg";
import carpinteria from "../assets/carousel/carpinteria.jpg";
import pottery from "../assets/carousel/pottery.jpg";
import { Link } from "react-router-dom";

export default function Inicio() {
	const slides = [
		{
			label: "Manualidades creativas",
			img: bricolaje2,
		},
		{
			label: "Bricolaje en casa",
			img: bricolaje1,
		},
		{
			label: "Restauración y decoración",
			img: bricolaje3,
		},
		{
			label: "Cursos online y presenciales",
			img: carpinteria,
		},
		{
			label: "Excelentes Profesores",
			img: pottery,
		},
	];

	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prev) => (prev + 1) % slides.length); //loop
	};

	const handleBack = () => {
		setActiveStep((prev) => (prev - 1 + slides.length) % slides.length); // loop
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Typography
				variant='h3'
				component='h1'
				align='center'
				sx={{ mt: 4, mb: 2 }}>
				Bienvenido a BricoAcademy
			</Typography>

			{/* Carrusel full width */}
			<Box
				sx={{
					position: "relative",
					width: "100%",
					height: { xs: 220, md: 420 },
					overflow: "hidden",
				}}>
				<Box
					component='img'
					src={slides[activeStep].img}
					alt={slides[activeStep].label}
					sx={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
						display: "block",
					}}
				/>

				{/* Flecha izquierda */}
				<IconButton
					onClick={handleBack}
					sx={{
						position: "absolute",
						top: "50%",
						left: 12,
						transform: "translateY(-50%)",
						backgroundColor: "rgba(255,255,255,0.55)",
						"&:hover": {
							backgroundColor: "rgba(255,255,255,0.75)",
						},
					}}>
					<KeyboardArrowLeft />
				</IconButton>

				{/* Flecha derecha */}
				<IconButton
					onClick={handleNext}
					sx={{
						position: "absolute",
						top: "50%",
						right: 12,
						transform: "translateY(-50%)",
						backgroundColor: "rgba(255,255,255,0.55)",
						"&:hover": {
							backgroundColor: "rgba(255,255,255,0.75)",
						},
					}}>
					<KeyboardArrowRight />
				</IconButton>

				{/* Texto sobre la imagen (suave) */}
				<Box
					sx={{
						position: "absolute",
						left: 16,
						bottom: 16,
						backgroundColor: "rgba(0,0,0,0.35)",
						color: "white",
						px: 2,
						py: 1,
						borderRadius: 2,
					}}>
					{slides[activeStep].label}
				</Box>
			</Box>

			{/* Texto descriptivo */}
			<Typography
				variant='h6'
				align='center'
				sx={{ maxWidth: 900, mx: "auto", mt: 3, px: 2 }}>
				Academia de manualidades y bricolaje con cursos presenciales y
				online. Aprende paso a paso con profesorado especializado y
				materiales prácticos.
			</Typography>
		</Box>
	);
}
