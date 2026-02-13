import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: { padding: 24, fontSize: 11 },
	header: { marginBottom: 12 },
	title: { fontSize: 16, marginBottom: 4 },
	subtitle: { fontSize: 10, color: "#555", marginBottom: 2 },

	table: { borderWidth: 1, borderColor: "#ddd" },
	rowHeader: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "#ddd",
		backgroundColor: "#f5f5f5",
	},
	row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#eee" },
	cellHeader: { padding: 6, fontSize: 10, fontWeight: "bold" },
	cell: { padding: 6 },

	colName: { width: "30%" },
	colDni: { width: "20%" },
	colEmail: { width: "35%" },
	colActive: { width: "15%" },

	footer: { marginTop: 12, fontSize: 9, color: "#777" },
});

export default function TeachersReportPdf({ rows = [], filtroActivo = "" }) {
	const filtroTexto =
		filtroActivo === ""
			? "Todos"
			: filtroActivo === "1"
				? "Activos"
				: "Inactivos";

	const fecha = new Date().toLocaleDateString();

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.header}>
					<Text style={styles.title}>
						BricoAcademy — Informe de Profesores
					</Text>
					<Text style={styles.subtitle}>Fecha: {fecha}</Text>
					<Text style={styles.subtitle}>
						Filtro activo: {filtroTexto}
					</Text>
					<Text style={styles.subtitle}>
						Total registros: {rows.length}
					</Text>
				</View>

				<View style={styles.table}>
					<View style={styles.rowHeader}>
						<Text style={[styles.cellHeader, styles.colName]}>
							Nombre
						</Text>
						<Text style={[styles.cellHeader, styles.colDni]}>
							DNI
						</Text>
						<Text style={[styles.cellHeader, styles.colEmail]}>
							Email
						</Text>
						<Text style={[styles.cellHeader, styles.colActive]}>
							Activo
						</Text>
					</View>

					{rows.map((t) => (
						<View style={styles.row} key={t.id_teacher}>
							<Text style={[styles.cell, styles.colName]}>
								{t.fullname}
							</Text>
							<Text style={[styles.cell, styles.colDni]}>
								{t.dni}
							</Text>
							<Text style={[styles.cell, styles.colEmail]}>
								{t.email}
							</Text>
							<Text style={[styles.cell, styles.colActive]}>
								{t.active ? "Sí" : "No"}
							</Text>
						</View>
					))}
				</View>

				<Text style={styles.footer}>
					BricoAcademy — Documento generado desde la aplicación
					(react-pdf)
				</Text>
			</Page>
		</Document>
	);
}
