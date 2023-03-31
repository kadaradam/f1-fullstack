import { DriverCountry } from 'types';

export const constructFlagUrl = (country: DriverCountry) =>
	`https://flagsapi.com/${country}/flat/64.png`;
