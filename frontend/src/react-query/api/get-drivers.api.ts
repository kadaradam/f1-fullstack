import { axiosService } from '../../axiosService';

// TODO: shared package
type GetDriversApiResponse = { success: boolean; data: any };
type GetDriversApi = () => Promise<GetDriversApiResponse>;

export const getDriversApi: GetDriversApi = async () => {
	const { data } = await axiosService.get<GetDriversApiResponse>(
		'/api/drivers',
	);

	return data;
};
