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

import logo from "../assets/logo.png";
import { Icon } from "@mui/material";

const pages = [
	{ label: "Inicio", path: "/" },
	{ label: "Profesores", path: "/teachers" },
	{ label: "Cursos", path: "/courses" },
];

export default function NavBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNAvMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position='sticky'>
			<Toolbar>
				{/*Logo*/}
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

				{/*Brand/Marca*/}
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

				{/*para que se vea la hamburguesa en movil (xs)*/}
				<Box sx={{ display: { xs: "flex", md: "none" } }}>
					<IconButton color='inherit' onClick={handleOpenNAvMenu}>
						<MenuIcon />
					</IconButton>

					<Menu
						anchorEl={anchorElNav}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}>
						{pages.map((p) => (
							<MenuItem
								key={p.path}
								onClick={handleCloseNavMenu}
								component={Link}
								to={p.path}>
								{p.label}
							</MenuItem>
						))}
					</Menu>
				</Box>

				<Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
					{pages.map((p) => (
						<Button
							key={p.path}
							color='inherit'
							component={Link}
							to={p.path}>
							{p.label}
						</Button>
					))}
				</Box>
			</Toolbar>
		</AppBar>
	);
}
