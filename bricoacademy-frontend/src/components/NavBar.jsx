import { useEffect } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";

import logo from "../assets/logo.png";

const teacherMenu = [
	{ id: "t_list", label: "Listado de profesores", path: "/teachers" },
	{ id: "t_new", label: "Alta de profesor", path: "/teachers/new" },
	{
		id: "t_filter",
		label: "Listado por activo/inactivo",
		path: "/teachers/filter",
	},
	{ id: "t_cards", label: "Perfiles", path: "/teachers/cards" },
];

const courseMenu = [
	{ id: "c_list", label: "Listado de cursos", path: "/courses" },
	{ id: "c_new", label: "Alta de curso", path: "/courses/new" },
	{ id: "c_filter", label: "Cursos por fechas", path: "/courses/filter" },
	{ id: "c_chart", label: "Gráfica cursos por profesor", path: "/stats/courses-per-teacher" },

];

export default function NavBar() {
	const [anchorElTeachers, setAnchorElTeachers] = React.useState(null);
	const [anchorElCourses, setAnchorElCourses] = React.useState(null);
	const [anchorElXS, setAnchorElXS] = React.useState(null);

	const handleOpenTeachers = (event) =>
		setAnchorElTeachers(event.currentTarget);
	const handleOpenCourses = (event) =>
		setAnchorElCourses(event.currentTarget);
	const handleOpenXS = (event) => setAnchorElXS(event.currentTarget);

	const handleCloseAll = () => {
		setAnchorElTeachers(null);
		setAnchorElCourses(null);
		setAnchorElXS(null);
	};

	useEffect(() => {
		const handleResize = () => handleCloseAll();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const linkStyle = { color: "black", textDecoration: "none" };

	return (
		<AppBar position='sticky'>
			<Toolbar>
				{/* Logo */}
				<Box
					sx={{
						backgroundColor: "rgba(255,255,255,0.6)",
						borderRadius: 1,
						padding: "4px 4px",
						display: "flex",
						alignItems: "center",
						mr: 1,
					}}>
					<Box
						component='img'
						src={logo}
						alt='BricoAcademy logo'
						sx={{ height: 32 }}
					/>
				</Box>

				{/* Marca */}
				<Typography
					variant='h6'
					component={Link}
					to='/'
					sx={{
						flexGrow: 1,
						color: "inherit",
						textDecoration: "none",
					}}>
					BricoAcademy
				</Typography>

				{/* XS (móvil): hamburguesa */}
				<Box sx={{ display: { xs: "flex", md: "none" } }}>
					<IconButton color='inherit' onClick={handleOpenXS}>
						<MenuIcon />
					</IconButton>

					<Menu
						anchorEl={anchorElXS}
						open={Boolean(anchorElXS)}
						onClose={handleCloseAll}
						keepMounted
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}>
						<MenuItem onClick={handleCloseAll}>
							<Link to='/' style={linkStyle}>
								Inicio
							</Link>
						</MenuItem>

						<Divider />
						<ListSubheader>Menú Profesores</ListSubheader>
						{teacherMenu.map((item) => (
							<MenuItem key={item.id} onClick={handleCloseAll}>
								<Link to={item.path} style={linkStyle}>
									{item.label}
								</Link>
							</MenuItem>
						))}

						<Divider />
						<ListSubheader>Menú Cursos</ListSubheader>
						{courseMenu.map((item) => (
							<MenuItem key={item.id} onClick={handleCloseAll}>
								<Link to={item.path} style={linkStyle}>
									{item.label}
								</Link>
							</MenuItem>
						))}
					</Menu>
				</Box>

				{/* MD+ (escritorio): botones con dropdown */}
				<Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
					<Button color='inherit' component={Link} to='/'>
						Inicio
					</Button>

					{/* Profesores */}
					<Button color='inherit' onClick={handleOpenTeachers}>
						Profesores
					</Button>
					<Menu
						anchorEl={anchorElTeachers}
						open={Boolean(anchorElTeachers)}
						onClose={handleCloseAll}
						keepMounted
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}>
						{teacherMenu.map((item) => (
							<MenuItem key={item.id} onClick={handleCloseAll}>
								<Link to={item.path} style={linkStyle}>
									{item.label}
								</Link>
							</MenuItem>
						))}
					</Menu>

					{/* Cursos */}
					<Button color='inherit' onClick={handleOpenCourses}>
						Cursos
					</Button>
					<Menu
						anchorEl={anchorElCourses}
						open={Boolean(anchorElCourses)}
						onClose={handleCloseAll}
						keepMounted
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}>
						{courseMenu.map((item) => (
							<MenuItem key={item.id} onClick={handleCloseAll}>
								<Link to={item.path} style={linkStyle}>
									{item.label}
								</Link>
							</MenuItem>
						))}
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
