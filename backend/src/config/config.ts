import { z } from 'zod';

const configSchema = z.object({
	PORT: z.string().transform(Number).default('3000'),
});

const parsedConfig = configSchema.parse(process.env);

export const config = parsedConfig;
