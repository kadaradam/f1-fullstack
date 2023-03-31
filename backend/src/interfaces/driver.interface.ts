export type DriverCountry =
	| 'TH'
	| 'ES'
	| 'FI'
	| 'FR'
	| 'GB'
	| 'DE'
	| 'CA'
	| 'MC'
	| 'DK'
	| 'GB'
	| 'FR'
	| 'MX'
	| 'AU'
	| 'GB'
	| 'ES'
	| 'DE'
	| 'CA'
	| 'JP'
	| 'NL'
	| 'DE'
	| 'CN';
export type DriverCode =
	| 'ALB'
	| 'ALO'
	| 'BOT'
	| 'GAS'
	| 'HAM'
	| 'HUL'
	| 'LAT'
	| 'LEC'
	| 'MAG'
	| 'NOR'
	| 'OCO'
	| 'PER'
	| 'RIC'
	| 'RUS'
	| 'SAI'
	| 'MSC'
	| 'STR'
	| 'TSU'
	| 'VER'
	| 'VET'
	| 'ZHO';
export type DriverTeam =
	| 'Williams'
	| 'Alpine'
	| 'Alfa Romeo'
	| 'AlphaTauri'
	| 'Aston Martin'
	| 'Ferrari'
	| 'Haas F1 Team'
	| 'McLaren'
	| 'Red Bull Racing'
	| 'Mercedes';

export interface Driver {
	id: number;
	code: DriverCode;
	firstname: string;
	lastname: string;
	country: DriverCountry;
	team: DriverTeam;
}
