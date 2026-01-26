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
	},
	palette: {
		primary: {
			main: "#b8bf9b",
		}, secondary:{
			main:"#ada588",
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
