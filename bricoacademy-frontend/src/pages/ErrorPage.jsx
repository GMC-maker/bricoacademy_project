import { Box, Typography, Button } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";
import Footer from "../components/footer";
export default function ErrorPage() {
	const error = useRouteError();

	return (
		<Box sx={{minHeight: "100vh", display:"flex", flexDirection: "column"}}>
			<Box sx={{ flexGrow: 1, textAlign: "center", mt: 6 }}>
				<Typography variant='h3' component='h1' gutterBottom>
					404
				</Typography>

				<Typography variant='h6' sx={{ mb: 2 }}>
					Uy… esta página no existe.
				</Typography>

				<Typography variant='body1' sx={{ mb: 3, opacity: 0.8 }}>
					{error?.statusText ||
						error?.message ||
						"Revisa la URL o usa el menú."}
				</Typography>

				<Button variant='contained' component={Link} to='/'>
					Volver al inicio
				</Button>
			</Box>
			<Footer />
		</Box>
	);
}
