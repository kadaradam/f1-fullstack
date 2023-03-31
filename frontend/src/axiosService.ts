import axios from 'axios';

export const axiosService = axios.create({
	// TODO: could come from shared constants lib
	baseURL: '/api',
});
