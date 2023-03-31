import driversJson from '../data/drivers.json';
import { z } from 'zod';

const driverZod = z.object({
	id: z.number(),
	code: z.string(),
	firstname: z.string(),
	lastname: z.string(),
	country: z.string(),
	team: z.string(),
});

type DriverJson = z.infer<typeof driverZod>;

const driverJsonSchema = driverZod.array();

const shuffleArray = <T>(arr: T[]): T[] => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
};

export const processDriversJson = (): DriverJson[] => {
	const parsedJson = driverJsonSchema.parse(driversJson);
	const shuffledJson = shuffleArray(parsedJson);

	return shuffledJson;
};
