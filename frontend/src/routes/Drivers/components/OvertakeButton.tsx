import LoadingButton from '@mui/lab/LoadingButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postOvertakeApi } from '../../../react-query/api/post-overtake.api';

type OvertakeButtonProps = {
	driverId: number;
};

const OvertakeButton = ({ driverId }: OvertakeButtonProps) => {
	const queryClient = useQueryClient();

	const { mutate: overtakeFront, isLoading: isLoading } = useMutation(
		postOvertakeApi,
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['drivers']);
			},
		},
	);

	return (
		<LoadingButton
			size="small"
			color="primary"
			variant="contained"
			onClick={() => overtakeFront({ driverId })}
			loading={isLoading}
		>
			Overtake
		</LoadingButton>
	);
};

export default OvertakeButton;
