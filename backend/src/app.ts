import express from 'express';
import morgan from 'morgan';
import { json as bodyParserJson } from 'body-parser';
import { config as dotenvConfig } from 'dotenv';
// Make sure to load dotenv, before the initalizing the config service
dotenvConfig();
import { config } from './config';
import { join } from 'path';
import { driversRouter } from './modules';
import { GLOBAL_API_PREFIX } from './constants';
import { flagImgProxyRouter } from './modules/flag-img-proxy/flag-img-proxy.router';

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

// Routes
app.use(GLOBAL_API_PREFIX, [driversRouter]);

// Image proxy
app.use(flagImgProxyRouter);

app.listen(port, () => {
	console.log(`API is running on port ${port}. `);
});
