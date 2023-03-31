import { PrismaClient } from '@prisma/client';
import { processDriversJson } from '../src/utils';

const prisma = new PrismaClient();

async function main() {
	const shuffledJson = processDriversJson();

	const drivers = shuffledJson.map((driver, index) => ({
		...driver,
		place: index + 1,
	}));

	const prismaInsertPromises = drivers.map((driver) =>
		prisma.driver.upsert({
			where: { id: driver.id },
			update: {},
			create: {
				id: driver.id,
				team: driver.team,
				code: driver.code,
				country: driver.country,
				firstname: driver.firstname,
				lastname: driver.lastname,
				place: driver.place,
			},
		}),
	);

	await Promise.all(prismaInsertPromises);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
