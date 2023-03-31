import { Driver } from 'types';
import prisma from '../providers/prisma';

export type OvertakeOptions =
	| {
			step?: number;
	  }
	| undefined;

class ManageDriversServicePrisma {
	public async getDrivers(): Promise<Driver[]> {
		const prismaDrivers = await prisma.driver.findMany({
			orderBy: {
				place: 'asc',
			},
		});

		const drivers = prismaDrivers.map((driver) => ({
			...driver,
			imgUrl: `/static/${driver.code.toLowerCase()}.png`,
		})) as Driver[];

		return drivers;
	}

	public async overtake(
		driverId: number,
		{ step = 1 }: OvertakeOptions = { step: 1 },
	): Promise<boolean> {
		const prismaDriverToMove = await prisma.driver.findFirst({
			where: { id: driverId },
		});

		if (!prismaDriverToMove) {
			return false;
		}

		const placeToMove = prismaDriverToMove.place - step;

		const prismaFrontDriver = await prisma.driver.findFirst({
			where: { place: placeToMove },
		});

		if (!prismaFrontDriver) {
			return false;
		}

		await Promise.all([
			prisma.driver.update({
				where: { id: prismaDriverToMove.id },
				data: { place: prismaFrontDriver.place },
			}),
			prisma.driver.update({
				where: { id: prismaFrontDriver.id },
				data: { place: prismaDriverToMove.place },
			}),
		]);

		return true;
	}
}

export { ManageDriversServicePrisma };
