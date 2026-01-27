import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

import Inicio from "./components/Inicio";
import ListadoTeachers from "./components/ListadoTeachers";
import ListadoCourses from "./components/ListadoCourses";
import ListadoTeachersFiltro from "./components/ListadoTeachersFiltro";
import ListadoCoursesFiltro from "./components/ListadoCoursesFiltro";

const router = createBrowserRouter([
	{
		path: "/",
		Component: Home,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, Component: Inicio },
			{ path: "teachers", Component: ListadoTeachers },
			{ path: "courses", Component: ListadoCourses },
			{ path: "teachers/filter", Component: ListadoTeachersFiltro },
			{ path: "courses/filter", Component: ListadoCoursesFiltro.jsx },
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
