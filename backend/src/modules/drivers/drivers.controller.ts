import { Router, Request, Response } from 'express';
import { Controller } from '../../interfaces';
import { driversState } from '../../services/drivers-state.service';

export class DriversController implements Controller {
	public router = Router();

	constructor() {
		this.router.get('/drivers', this.drivers);
		this.router.post('/drivers/:driverId/overtake', this.overtake);
	}

	private drivers(req: Request, res: Response) {
		try {
			const drivers = driversState.getDrivers();

			res.send({ success: true, data: drivers });
		} catch (err) {
			console.error(err);
			res.status(500).json({
				success: false,
				error: 'Unable to list drivers.',
			});
		}
	}

	private overtake(req: Request, res: Response) {
		try {
			const { driverId } = req.params;

			if (!driverId) {
				res.status(400).json({
					success: false,
					error: 'Missing "driverId" param.',
				});
				return;
			}

			const driverIdInt = parseInt(driverId);

			const success = driversState.overtake(driverIdInt);

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
