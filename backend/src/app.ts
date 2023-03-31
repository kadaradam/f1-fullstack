import express from 'express';
import morgan from 'morgan';
import { json as bodyParserJson } from 'body-parser';
import { config as dotenvConfig } from 'dotenv';
// Make sure to load dotenv, before the initalizing the config service
dotenvConfig();
import { config } from './config';
import { join } from 'path';

const app = express();
const port = config.PORT;

// Middlewares
app.use(bodyParserJson());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Server static assets
app.use('/static', express.static(join(__dirname, '..', 'public', 'static')));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(join(__dirname, '..', '..', 'frontend', 'dist')));
}

app.listen(port, () => {
	console.log(`API is running on port ${port}. `);
});
