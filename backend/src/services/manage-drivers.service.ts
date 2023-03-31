import { Driver } from 'types';

class ManageDriversService {
	private drivers: Driver[];

	constructor(driversInput: Driver[]) {
		this.drivers = driversInput;
	}

	public getDrivers(): Driver[] {
		return this.drivers;
	}

	public overtake(driverId: number): boolean {
		const driverIndex = this.drivers.findIndex(
			(racer) => racer.id === driverId,
		);

		if (driverIndex === -1) {
			return false;
		}

		const currentPos = this.drivers[driverIndex].place;
		const frontDriver = this.drivers.find(
			(racer) => racer.place < currentPos,
		);

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
