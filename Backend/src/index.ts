/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {productsRouter} from './models/products/products.router';
import {categoriesRouter} from './models/categories/categories.router';
import {manufacturersRouter} from './models/manufacturers/manufacturers.router';
import {pricesRouter} from './models/prices/prices.router';
import {vendorsRouter} from './models/vendors/vendors.router';
import {errorHandler} from './middleware/error.middleware';
import {notFoundHandler} from './middleware/notFound.middleware';
import {usersRouter} from './models/users/users.router';
import {pricealarmsRouter} from './models/pricealarms/pricealarms.router';
import {contactpersonsRouter} from './models/contact_persons/contact_persons.router';
import {favoriteshopsRouter} from './models/favorite_shops/favoriteshops.router';
import {crawlingstatusRouter} from './models/crawling_status/crawling_status.router';

const cookieParser = require('cookie-parser');

dotenv.config();


/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();


/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/manufacturers', manufacturersRouter);
app.use('/prices', pricesRouter);
app.use('/users', usersRouter);
app.use('/vendors', vendorsRouter);
app.use('/pricealarms', pricealarmsRouter);
app.use('/contactpersons', contactpersonsRouter);
app.use('/favoriteshops', favoriteshopsRouter);
app.use('/crawlingstatus', crawlingstatusRouter);

app.use(errorHandler);
app.use(notFoundHandler);


/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
