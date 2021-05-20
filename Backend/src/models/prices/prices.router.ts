/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as PriceService from './prices.service';
import {Price} from './price.interface';
import {Prices} from './prices.interface';
import * as UserService from '../users/users.service';


/**
 * Router Definition
 */

export const pricesRouter = express.Router();


/**
 * Controller Definitions
 */

// GET prices/
pricesRouter.get('/', async (req: Request, res: Response) => {
    try {
        let prices: Prices = [];
        const product = req.query.product;
        const vendor = req.query.vendor;
        const type = req.query.type;

        if (product) {
            if (vendor) {
                prices = await PriceService.findByVendor(<string> product, <string> vendor, <string> type);
            } else {
                prices = await PriceService.findByType(<string> product, <string> type);
            }
        } else {
            prices = await PriceService.findAll();
        }

        res.status(200).send(prices);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// GET prices/:id
pricesRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const price: Price = await PriceService.find(id);

        res.status(200).send(price);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// GET prices/bestDeals
pricesRouter.get('/bestDeals/:amount', async (req: Request, res: Response) => {
    const amount: number = parseInt(req.params.amount, 10);

    if (!amount) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const prices: Prices = await PriceService.getBestDeals(amount);

        res.status(200).send(prices);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// GET prices/byProduct/list/[]
pricesRouter.get('/byProduct/list/:ids', async (req: Request, res: Response) => {
    const productIds: [number] = JSON.parse(req.params.ids);

    if (!productIds) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const prices: Prices = await PriceService.findListByProducts(productIds);

        res.status(200).send(prices);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// POST prices/
pricesRouter.post('/', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const user = await UserService.checkSessionWithCookie(req.cookies.betterauth, user_ip);

        // Get required parameters
        const vendor_id = req.body.vendor_id;
        const product_id = req.body.product_id;
        const price_in_cents = req.body.price_in_cents;

        const success = await PriceService.createPriceEntry(user.user_id, vendor_id, product_id, price_in_cents);

        if (success) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});
