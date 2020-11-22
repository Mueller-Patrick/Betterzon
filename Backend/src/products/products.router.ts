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

// GET items/

productsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const products: Products = await ProductService.findAll();

        res.status(200).send(products);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET items/:id

productsRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const product: Product = await ProductService.find(id);

        res.status(200).send(product);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// POST items/

productsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const product: Product = req.body.product;

        await ProductService.create(product);

        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT items/

productsRouter.put('/', async (req: Request, res: Response) => {
    try {
        const product: Product = req.body.product;

        await ProductService.update(product);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE items/:id

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await ProductService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
