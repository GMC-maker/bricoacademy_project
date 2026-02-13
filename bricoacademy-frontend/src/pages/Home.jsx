/**
 * @module pages/Home
 * @description Página principal de la aplicación BricoAcademy.
 */

import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import ScrollTopButton from "../components/ScrollTopButton";
import Footer from "../components/footer";

/**
 * Página `Home`.
 *
 * Componente layout que envuelve las rutas hijas mediante `Outlet` y
 * añade la barra de navegación, el botón de subir al inicio y el pie de página.
 */
export default function Home() {
	return (
		<>
			<NavBar />
			<Box sx={{ p: 2 }}>
				<Outlet />
			</Box>
			<ScrollTopButton />
			<Footer />
		</>
	);
}
