/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as VendorService from './vendors.service';
import {Vendor} from './vendor.interface';
import {Vendors} from './vendors.interface';


/**
 * Router Definition
 */

export const vendorsRouter = express.Router();


/**
 * Controller Definitions
 */

// GET items/

vendorsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const vendors: Vendors = await VendorService.findAll();

        res.status(200).send(vendors);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET items/:id

vendorsRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const vendor: Vendor = await VendorService.find(id);

        res.status(200).send(vendor);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET items/:name

vendorsRouter.get('/search/:term', async (req: Request, res: Response) => {
    const term: string = req.params.term;

    if (!term) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const vendors: Vendors = await VendorService.findBySearchTerm(term);

        res.status(200).send(vendors);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// POST items/

// vendorsRouter.post('/', async (req: Request, res: Response) => {
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
// vendorsRouter.put('/', async (req: Request, res: Response) => {
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
// vendorsRouter.delete('/:id', async (req: Request, res: Response) => {
//     try {
//         const id: number = parseInt(req.params.id, 10);
//         await CategoryService.remove(id);
//
//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
