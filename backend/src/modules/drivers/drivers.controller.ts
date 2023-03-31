import { Router, Request, Response } from 'express';
import { Controller, CustomRequest } from '../../interfaces';
// Old Code with in-memory state
//import { driversState } from '../../services/drivers-state.service';
import { OvertakeOptions } from '../../services/manage-drivers.service';
import { ManageDriversServicePrisma } from '../../services/manage-drivers.service-prisma';

type OvertakeDto = { step?: number };

export class DriversController implements Controller {
	public router = Router();
	private prismaDriverService: ManageDriversServicePrisma;

	constructor() {
		this.prismaDriverService = new ManageDriversServicePrisma();

		this.router.get('/drivers', this.drivers.bind(this));
		this.router.post(
			'/drivers/:driverId/overtake',
			this.overtake.bind(this),
		);
	}

	private async drivers(req: Request, res: Response) {
		try {
			// Old Code with in-memory state
			// const drivers = driversState.getDrivers();
			// const sortedDrivers = drivers.sort((a, b) => a.place - b.place);
			const drivers = await this.prismaDriverService.getDrivers();

			res.send({ success: true, data: drivers });
		} catch (err) {
			console.error(err);
			res.status(500).json({
				success: false,
				error: 'Unable to list drivers.',
			});
		}
	}

	private async overtake(req: CustomRequest<OvertakeDto>, res: Response) {
		try {
			const { driverId } = req.params;
			const { step } = req.body;

			if (!driverId) {
				res.status(400).json({
					success: false,
					error: 'Missing "driverId" param.',
				});
				return;
			}

			const overtakeOptions: OvertakeOptions = step
				? { step }
				: undefined;

			const driverIdInt = parseInt(driverId);

			// Old Code with in-memory state
			// const success = driversState.overtake(driverIdInt, overtakeOptions);

			const success = await this.prismaDriverService.overtake(
				driverIdInt,
				overtakeOptions,
			);

			res.send({ success });
		} catch (err) {
			console.error(err);
			res.status(500).json({
				success: false,
				error: 'Unable to overtake driver.',
			});
		}
	}
}
