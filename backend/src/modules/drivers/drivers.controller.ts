import { Router, Request, Response } from 'express';
import { Controller, CustomRequest } from '../../interfaces';
import { driversState } from '../../services/drivers-state.service';
import { OvertakeOptions } from '../../services/manage-drivers.service';

type OvertakeDto = { step?: number };

export class DriversController implements Controller {
	public router = Router();

	constructor() {
		this.router.get('/drivers', this.drivers);
		this.router.post('/drivers/:driverId/overtake', this.overtake);
	}

	private drivers(req: Request, res: Response) {
		try {
			const drivers = driversState.getDrivers();
			const sortedDrivers = drivers.sort((a, b) => a.place - b.place);

			res.send({ success: true, data: sortedDrivers });
		} catch (err) {
			console.error(err);
			res.status(500).json({
				success: false,
				error: 'Unable to list drivers.',
			});
		}
	}

	private overtake(req: CustomRequest<OvertakeDto>, res: Response) {
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

			const success = driversState.overtake(driverIdInt, overtakeOptions);

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
