import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import ScrollTopButton from "../components/ScrollTopButton";

export default function Home() {
	return (
		<>
			<NavBar />
			<Box sx={{ p: 2 }}>
				<Outlet />
			</Box>
			<ScrollTopButton />
		</>
	);
}
