/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as PriceService from './prices.service';
import {Price} from './price.interface';
import {Prices} from './prices.interface';


/**
 * Router Definition
 */

export const pricesRouter = express.Router();


/**
 * Controller Definitions
 */

// GET items/

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
        res.status(404).send(e.message);
    }
});

// GET items/:id

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
        res.status(404).send(e.message);
    }
});

// POST items/

// pricesRouter.post('/', async (req: Request, res: Response) => {
//     try {
//         const category: Category = req.body.category;
//
//         await CategoryService.create(category);
//
//         res.sendStatus(201);
//     } catch (e) {
//         res.status(404).send(e.message);
//     }
// });
//
// // PUT items/
//
// pricesRouter.put('/', async (req: Request, res: Response) => {
//     try {
//         const category: Category = req.body.category;
//
//         await CategoryService.update(category);
//
//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// // DELETE items/:id
//
// pricesRouter.delete('/:id', async (req: Request, res: Response) => {
//     try {
//         const id: number = parseInt(req.params.id, 10);
//         await CategoryService.remove(id);
//
//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
