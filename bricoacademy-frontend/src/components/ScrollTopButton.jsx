/**
 * @module components/ScrollTopButton
 * @description Botón que permite desplazarse automáticamente al inicio de la página.
 */

import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";

/**
 * Componente `ScrollTopButton`.
 *
 * Muestra un botón flotante para volver al inicio de la página cuando el
 * usuario ha hecho scroll hacia abajo (>100px). Se oculta automáticamente
 * cuando el scroll está en la parte superior.
 */
export default function ScrollTopButton() {
	const [visible, setVisible] = useState(false);

	/**
	 * Efecto que registra un listener de scroll y actualiza `visible`.
	 * - `visible` pasa a true cuando `window.scrollY > 100`.
	 * - Limpia el listener al desmontar el componente.
	 */
	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 100);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	/**
	 * scrollToTop - desplaza suavemente la ventana a la parte superior.
	 */
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!visible) return null;

	return (
		<Fab
			color='primary'
			size='small'
			onClick={scrollToTop}
			sx={{
				position: "fixed",
				bottom: 16,
				right: 16,
			}}>
			<KeyboardArrowUpIcon />
		</Fab>
	);
}
