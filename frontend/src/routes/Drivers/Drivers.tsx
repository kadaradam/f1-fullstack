import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { colors } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getDriversApi } from '../../react-query/api';
import ListDrivers from './components/ListDrivers';
import { DriverListHeader } from './components/DriverListHeader';

const Drivers = () => {
	const { data: drivers, isLoading } = useQuery(['drivers'], () =>
		getDriversApi(),
	);

	const isDriversLoading = isLoading && !drivers;

	return (
		<Container sx={{ bgcolor: '#2a4e53', pb: 4 }}>
			<Typography variant="h4" pt={4}>
				Formula 1 Competitors
			</Typography>
			<Box mt={3}>
				{isDriversLoading ? (
					<Skeleton sx={{ flexGrow: 1 }}>
						<Typography variant="h6">2 drivers</Typography>
					</Skeleton>
				) : (
					<Box display="flex" alignItems="center">
						<Typography variant="h6" sx={{ flexGrow: 1 }}>
							{drivers?.length} drivers
						</Typography>
					</Box>
				)}
			</Box>
			<Box pt={2}>
				<DriverListHeader isLoading={isDriversLoading} />
				{drivers ? <ListDrivers drivers={drivers} /> : null}
			</Box>
		</Container>
	);
};

export default Drivers;
