import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";

export default function ScrollTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 100);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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
