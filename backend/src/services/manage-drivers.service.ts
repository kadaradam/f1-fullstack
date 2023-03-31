import { Driver } from 'types';

export type OvertakeOptions =
	| {
			step?: number;
	  }
	| undefined;

class ManageDriversService {
	private drivers: Driver[];

	constructor(driversInput: Driver[]) {
		this.drivers = driversInput;
	}

	public getDrivers(): Driver[] {
		return this.drivers;
	}

	public overtake(
		driverId: number,
		{ step = 1 }: OvertakeOptions = { step: 1 },
	): boolean {
		const driverIndex = this.drivers.findIndex(
			(racer) => racer.id === driverId,
		);

		if (driverIndex === -1) {
			return false;
		}

		const currentPos = this.drivers[driverIndex].place;
		const frontDriver = this.drivers[driverIndex - step];

		if (!frontDriver) {
			return false;
		}

		const frontDriverIndex = this.drivers.indexOf(frontDriver);

		this.drivers[driverIndex].place = frontDriver.place;
		this.drivers[frontDriverIndex].place = currentPos;

		return true;
	}
}

export { ManageDriversService };
