import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/*he creado un tema personalizado para aplicar estilos */
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import "@fontsource/abeezee/400.css";
import "@fontsource/abeezee/400-italic.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const theme = createTheme({
	typography: {
		fontFamily: "'ABeeZee', sans-serif",
		h1: {
			fontSize: "2.2rem",
			"@media (min-width:600px)": { fontSize: "2.8rem" },
		},
		h2: {
			fontSize: "1.8rem",
			"@media (min-width:600px)": { fontSize: "2.2rem" },
		},
		h3: {
			fontSize: "1.6rem",
			"@media (min-width:600px)": { fontSize: "2rem" },
		},
		body1: {
			fontSize: "0.95rem",
			"@media (min-width:600px)": { fontSize: "1.05rem" },
		},
		body2: {
			fontSize: "0.85rem",
			"@media (min-width:600px)": { fontSize: "0.95rem" },
		},
	},
	palette: {
		primary: {
			main: "#b8bf9b",
		},
		secondary: {
			main: "#ada588",
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
);
