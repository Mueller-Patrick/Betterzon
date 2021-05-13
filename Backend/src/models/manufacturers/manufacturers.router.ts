/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as ManufacturerService from './manufacturers.service';
import {Manufacturer} from './manufacturer.interface';
import {Manufacturers} from './manufacturers.interface';


/**
 * Router Definition
 */

export const manufacturersRouter = express.Router();


/**
 * Controller Definitions
 */

// GET items/
manufacturersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const manufacturers: Manufacturers = await ManufacturerService.findAll();

        res.status(200).send(manufacturers);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// GET items/:id
manufacturersRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const manufacturer: Manufacturer = await ManufacturerService.find(id);

        res.status(200).send(manufacturer);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// GET items/:term
manufacturersRouter.get('/search/:term', async (req: Request, res: Response) => {
    const term: string = req.params.term;

    if (!term) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const manufacturer: Manufacturers = await ManufacturerService.findBySearchTerm(term);

        res.status(200).send(manufacturer);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});
