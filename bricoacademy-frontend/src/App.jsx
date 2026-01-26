import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import ErrorPage from "./pages/ErrorPage";
import ScrollTopButton from "./components/ScrollTopButton";


export default function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Box sx={{ p: 2 }}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/teachers' element={<Teachers />} />
					<Route path='/courses' element={<Courses />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</Box>

			<ScrollTopButton />
		</BrowserRouter>
	);
}
