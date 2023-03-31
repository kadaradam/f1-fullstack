import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const DriverListHeader = ({ isLoading }: { isLoading: boolean }) => {
	return (
		<Box
			sx={{
				py: 1,
				px: 2,
				mb: 0.5,
				borderRadius: 0.5,
				backgroundColor: 'white.main',
			}}
		>
			<Grid container>
				<Grid item xs={1} />
				<Grid item xs={3}>
					<Typography variant="caption">
						{isLoading ? <Skeleton width={100} /> : 'Name'}
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography variant="caption">
						{isLoading ? <Skeleton width={100} /> : 'Team'}
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography variant="caption">
						{isLoading ? <Skeleton width={100} /> : 'Code'}
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography variant="caption">
						{isLoading ? <Skeleton width={100} /> : 'Country'}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};
