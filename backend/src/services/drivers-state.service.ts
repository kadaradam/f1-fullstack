import { Driver } from 'types';
import { ManageDriversService } from './manage-drivers.service';
import { processDriversJson } from '../utils';

class DriversStateService {
	private static instance: ManageDriversService;

	constructor() {
		DriversStateService.instance = this._loadData();
	}

	private _loadData(): ManageDriversService {
		const shuffledJson = processDriversJson();

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
