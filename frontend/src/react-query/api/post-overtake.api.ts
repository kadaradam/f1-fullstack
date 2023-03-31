import { axiosService } from '../../axiosService';

type PostOvertakeApiResponse = { success: boolean };
type PostOvertakeApi = ({
	driverId,
	step,
}: {
	driverId: number;
	step?: number;
}) => Promise<PostOvertakeApiResponse>;

export const postOvertakeApi: PostOvertakeApi = async ({ driverId, step }) => {
	const { data } = await axiosService.post<PostOvertakeApiResponse>(
		`/drivers/${driverId}/overtake`,
		step ? { step } : undefined,
	);

	return data;
};
