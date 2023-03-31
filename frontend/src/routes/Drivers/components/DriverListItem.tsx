import { Driver } from 'types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OvertakeButton from './OvertakeButton';
import { constructFlagUrl } from '../../../utils';
// eslint-disable-next-line import/no-unresolved
import dragIndicatorSvg from '/drag_indicator.svg';

type DriverListItemProps = {
	item: Driver;
};

export const DriverListItem = ({ item }: DriverListItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: item.id,
			data: {},
		});

	const fullName = `${item.firstname} ${item.lastname}`;

	return (
		<Box
			ref={setNodeRef}
			sx={{
				p: 2,
				mb: 0.5,
				borderRadius: 0.5,
				borderColor: 'white.main',
				borderWidth: 1,
				borderStyle: 'solid',
				backgroundColor: colors.cyan[500],
				// DndKit props
				transform: CSS.Transform.toString(transform),
				transition,
			}}
		>
			<Grid container alignItems="center">
				<Grid item xs={1}>
					<img
						src={dragIndicatorSvg}
						{...listeners}
						{...attributes}
						style={{ cursor: 'grab' }}
					/>
				</Grid>
				<Grid item xs={2} display="flex" alignItems="center">
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
