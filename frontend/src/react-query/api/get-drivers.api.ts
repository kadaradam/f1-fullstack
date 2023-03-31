import { Driver } from 'types';
import { axiosService } from '../../axiosService';

type GetDriversApiResponse = { success: boolean; data: Driver[] };
type GetDriversApi = () => Promise<GetDriversApiResponse>;

export const getDriversApi: GetDriversApi = async () => {
	const { data } = await axiosService.get<GetDriversApiResponse>('/drivers');

	return data;
};
