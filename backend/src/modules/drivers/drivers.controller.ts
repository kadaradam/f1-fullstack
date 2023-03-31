import { Router, Request, Response } from 'express';
import { Controller } from '../../interfaces';

export class DriversController implements Controller {
	public router = Router();

	constructor() {
		this.router.get('/drivers/:driverId/overtake', this.overtake);
	}

	private overtake(req: Request, res: Response) {
		res.send({ success: true });
	}
}
