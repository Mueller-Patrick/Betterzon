/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as ProductService from './products.service';
import {Product} from './product.interface';
import {Products} from './products.interface';


/**
 * Router Definition
 */

export const productsRouter = express.Router();


/**
 * Controller Definitions
 */

// GET products/

productsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const products: Products = await ProductService.findAll();

        res.status(200).send(products);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET products/:id

productsRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const product: Product = await ProductService.find(id);

        res.status(200).send(product);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET products/search/:term

productsRouter.get('/search/:term', async (req: Request, res: Response) => {
    const term: string = req.params.term;

    if (!term) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const products: Products = await ProductService.findBySearchTerm(term);

        res.status(200).send(products);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET products/list/[1,2,3]

productsRouter.get('/list/:ids', async (req: Request, res: Response) => {
    const ids: [number] = JSON.parse(req.params.ids);

    if (!ids) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const products: Products = await ProductService.findList(ids);

        res.status(200).send(products);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET products/bestDeals


// POST items/

// productsRouter.post('/', async (req: Request, res: Response) => {
//     try {
//         const product: Product = req.body.product;
//
//         await ProductService.create(product);
//
//         res.sendStatus(201);
//     } catch (e) {
//         res.status(404).send(e.message);
//     }
// });
//
// // PUT items/
//
// productsRouter.put('/', async (req: Request, res: Response) => {
//     try {
//         const product: Product = req.body.product;
//
//         await ProductService.update(product);
//
//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// // DELETE items/:id
//
// productsRouter.delete('/:id', async (req: Request, res: Response) => {
//     try {
//         const id: number = parseInt(req.params.id, 10);
//         await ProductService.remove(id);
//
//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
