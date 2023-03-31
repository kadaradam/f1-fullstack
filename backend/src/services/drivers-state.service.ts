import driversJson from './../data/drivers.json';
import { z } from 'zod';
import { Driver } from '../interfaces';
import { ManageDriversService } from './manage-drivers.service';

const driverJsonSchema = z
	.object({
		id: z.number(),
		code: z.string(),
		firstname: z.string(),
		lastname: z.string(),
		country: z.string(),
		team: z.string(),
	})
	.array();

const shuffleArray = <T>(arr: T[]): T[] => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
};

class DriversStateService {
	private static instance: ManageDriversService;

	constructor() {
		DriversStateService.instance = this._loadData();
	}

	private _loadData(): ManageDriversService {
		const parsedJson = driverJsonSchema.parse(driversJson);
		const shuffledJson = shuffleArray(parsedJson);

		const drivers = shuffledJson.map((driver, index) => ({
			...driver,
			place: index + 1,
			imgUrl: `/static/${driver.code.toLowerCase()}.png`,
		})) as Driver[];

		return new ManageDriversService(drivers);
	}

	public static getInstance(): ManageDriversService {
		if (!DriversStateService.instance) {
			new DriversStateService();
		}
		return DriversStateService.instance;
	}
}

const driversState = DriversStateService.getInstance();
Object.freeze(driversState);

export { driversState };
