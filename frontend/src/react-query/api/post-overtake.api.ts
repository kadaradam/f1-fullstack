import { axiosService } from '../../axiosService';

type PostOvertakeApiResponse = { success: boolean };
type PostOvertakeApi = ({
	driverId,
}: {
	driverId: number;
}) => Promise<PostOvertakeApiResponse>;

export const postOvertakeApi: PostOvertakeApi = async ({ driverId }) => {
	const { data } = await axiosService.post<PostOvertakeApiResponse>(
		`/api/drivers/${driverId}/overtake`,
	);

	return data;
};
