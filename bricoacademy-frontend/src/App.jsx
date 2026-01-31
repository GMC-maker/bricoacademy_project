import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

import Inicio from "./components/Inicio";
import ListadoTeachers from "./components/ListadoTeachers";
import ListadoCourses from "./components/ListadoCourses";
import ListadoTeachersFiltro from "./components/ListadoTeachersFiltro";
import ListadoCoursesFiltro from "./components/ListadoCoursesFiltro";
import AltaTeacher from "./components/AltaTeacher";
import EditarTeacher from "./components/EditarTeacher";
import AltaCourse from "./components/AltaCourse";
import EditarCourse from "./components/EditarCourse";

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
			{ path: "courses/filter", Component: ListadoCoursesFiltro },
			{ path: "teachers/new", Component: AltaTeacher },
			{ path: "teachers/edit/:id_teacher", Component: EditarTeacher },
			{ path: "courses/new", Component: AltaCourse },
			{ path: "courses/edit/:id_course", Component: EditarCourse },
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
