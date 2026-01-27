import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email"
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Typography } from "@mui/material";

export default function Footer() {
	return (
		<Box
			component='footer'
			sx={{
				mt: 6,
				py: 2,
				px: 2,
				textAlign: "center",
				backgroundColor: "rgba(0,0,0,0.06)",
			}}>
			<Box sx={{ mb: 1 }}>
				<IconButton
					aria-label='Facebook'
					href='https://facebook.com'
					target='_blank'
					rel='noreferrer'>
					<FacebookIcon />
				</IconButton>

				<IconButton
					aria-label='Instagram'
					href='https://instagram.com'
					target='_blank'
					rel='noreferrer'>
					<InstagramIcon />
				</IconButton>

				<IconButton
					component="a"
					aria-label='Contact us'
					href='mailto:info@bricoacademy.com'>
					<EmailIcon />
				</IconButton>
			</Box>

			<Typography variant='body2'>
				© {new Date().getFullYear()} BricoAcademy · Proyecto 2º DAM
			</Typography>
		</Box>
	);
}
