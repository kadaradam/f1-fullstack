import { Driver } from 'types';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OvertakeButton from './OvertakeButton';
import { constructFlagUrl } from '../../../utils';

type DriverListItemProps = {
	item: Driver;
};

export const DriverListItem = ({ item }: DriverListItemProps) => {
	const fullName = `${item.firstname} ${item.lastname}`;

	return (
		<Box
			sx={{
				p: 2,
				mb: 0.5,
				borderRadius: 0.5,
				borderColor: 'white.main',
				borderWidth: 1,
				borderStyle: 'solid',
				backgroundColor: colors.cyan[500],
			}}
		>
			<Grid container alignItems="center">
				<Grid item xs={1} display="flex" alignItems="center">
					<img
						src={constructFlagUrl(item.country)}
						alt={item.country}
						width={32}
					/>
					<Typography variant="h5" color={colors.pink[800]} pl={2}>
						{item.place}
					</Typography>
				</Grid>
				<Grid item xs={3} display="flex" alignItems="center">
					<Avatar alt={fullName} src={item.imgUrl} />
					<Typography variant="body1">{fullName}</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography variant="body1">{item.team}</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography variant="body1">{item.code}</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography variant="body1">{item.country}</Typography>
				</Grid>
				<Grid
					item
					xs={2}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
				>
					<OvertakeButton driverId={item.id} />
				</Grid>
			</Grid>
		</Box>
	);
};
