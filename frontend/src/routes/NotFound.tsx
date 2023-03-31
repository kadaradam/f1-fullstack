import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';

const NotFound = () => (
	<Container component="main" maxWidth="sm" sx={{ height: '100vh' }}>
		<CenterBox sx={{ alignItems: 'flex-start' }}>
			<Typography variant="h5" mb={5}>
				Oops. Page not found! 😢
			</Typography>
			<Button href="/" variant="contained" color="primary">
				Back to home
			</Button>
		</CenterBox>
	</Container>
);

export const CenterBox = styled(Box)({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
});

export default NotFound;
