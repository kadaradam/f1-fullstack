import { useOutlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';

const Root = () => {
	const outlet = useOutlet();

	return (
		<>
			{outlet ? (
				outlet
			) : (
				<CenterBox>
					<Button href="/drivers" variant="contained" color="primary">
						Go to drivers
					</Button>
				</CenterBox>
			)}
		</>
	);
};

export const CenterBox = styled(Box)({
	height: '100vh',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
});

export default Root;
