/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as VendorService from './vendors.service';
import {Vendor} from './vendor.interface';
import {Vendors} from './vendors.interface';
import * as UserService from '../users/users.service';


/**
 * Router Definition
 */

export const vendorsRouter = express.Router();


/**
 * Controller Definitions
 */

// GET vendors/
vendorsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const vendors: Vendors = await VendorService.findAll();

        res.status(200).send(vendors);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// GET vendors/managed
vendorsRouter.get('/managed', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const user = await UserService.checkSessionWithCookie(req.cookies.betterauth, user_ip);

        const vendors = await VendorService.getManagedShops(user.user_id);

        res.status(200).send(vendors);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// GET vendors/:id
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
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// GET vendors/search/:term
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
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// PUT vendors/manage/deactivatelisting
vendorsRouter.put('/manage/deactivatelisting', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const user = await UserService.checkSessionWithCookie(req.cookies.betterauth, user_ip);

        // Get required parameters
        const vendor_id = req.body.vendor_id;
        const product_id = req.body.product_id;

        const success = await VendorService.deactivateListing(user.user_id, vendor_id, product_id);

        if (success) {
            res.status(200).send({});
        } else {
            res.status(500).send({});
        }
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// PUT vendors/manage/shop/deactivate/:id
vendorsRouter.put('/manage/shop/deactivate/:id', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const user = await UserService.checkSessionWithCookie(req.cookies.betterauth, user_ip);

        // Get required parameters
        const vendor_id = parseInt(req.params.id, 10);

        const success = await VendorService.setShopStatus(user.user_id, vendor_id, false);

        if (success) {
            res.status(200).send({});
        } else {
            res.status(500).send({});
        }
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// PUT vendors/manage/shop/activate/:id
vendorsRouter.put('/manage/shop/activate/:id', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const user = await UserService.checkSessionWithCookie(req.cookies.betterauth, user_ip);

        // Get required parameters
        const vendor_id = parseInt(req.params.id, 10);

        const success = await VendorService.setShopStatus(user.user_id, vendor_id, true);

        if (success) {
            res.status(200).send({});
        } else {
            res.status(500).send({});
        }
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});
