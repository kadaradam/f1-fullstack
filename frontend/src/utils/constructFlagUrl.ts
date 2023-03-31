import { DriverCountry } from 'types';

export const constructFlagUrl = (country: DriverCountry) =>
	`/image/flag/${country}`;
