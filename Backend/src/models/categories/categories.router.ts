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
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({"message": "Internal Server Error. Try again later."}));
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
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({"message": "Internal Server Error. Try again later."}));
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
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({"message": "Internal Server Error. Try again later."}));
    }
});
