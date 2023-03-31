import { Router, Request, Response } from 'express';
import { Controller } from '../../interfaces';
import axios from 'axios';

export class FlagImgProxyController implements Controller {
	public router = Router();

	constructor() {
		this.router.get('/image/flag/:countryCode', this.imgProxy);
	}

	private async imgProxy(req: Request, res: Response) {
		try {
			const { countryCode } = req.params;

			if (!countryCode) {
				res.status(400).json({
					success: false,
					error: 'Missing "countryCode" param.',
				});
				return;
			}

			const response = await axios.get(
				`https://flagsapi.com/${countryCode}/flat/64.png`,
				{ responseType: 'arraybuffer' },
			);

			res.set('Content-Type', response.headers['content-type']);
			res.set('Cache-Control', 'max-age=31536000, immutable');

			res.send(response.data);
		} catch (err) {
			console.error(err);
			res.status(500).json({
				success: false,
				error: 'Unable to fetch image driver.',
			});
		}
	}
}
