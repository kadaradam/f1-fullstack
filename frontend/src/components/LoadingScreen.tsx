import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingScreen = () => (
	<Box
		sx={{
			height: '100vh',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		<CircularProgress size={64} />
	</Box>
);

export default LoadingScreen;
