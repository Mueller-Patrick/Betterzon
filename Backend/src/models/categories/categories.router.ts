/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as CategoryService from './categories.service';
import {Category} from './category.interface';
import {Categories} from './categories.interface';


/**
 * Router Definition
 */

export const categoriesRouter = express.Router();


/**
 * Controller Definitions
 */

// GET categories/

categoriesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const categories: Categories = await CategoryService.findAll();

        res.status(200).send(categories);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET categories/:id

categoriesRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const category: Category = await CategoryService.find(id);

        res.status(200).send(category);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET categories/search/:term

categoriesRouter.get('/search/:term', async (req: Request, res: Response) => {
    const term: string = req.params.term;

    if (!term) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const categories: Categories = await CategoryService.findBySearchTerm(term);

        res.status(200).send(categories);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// POST items/

// categoriesRouter.post('/', async (req: Request, res: Response) => {
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
// categoriesRouter.put('/', async (req: Request, res: Response) => {
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
// categoriesRouter.delete('/:id', async (req: Request, res: Response) => {
//     try {
//         const id: number = parseInt(req.params.id, 10);
//         await CategoryService.remove(id);
//
//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
