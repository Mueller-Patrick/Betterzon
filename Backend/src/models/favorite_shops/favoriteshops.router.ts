/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as FavoriteShopsService from './favoriteshops.service';
import {FavoriteShop} from './favoriteshop.interface';
import {FavoriteShops} from './favoriteshops.interface';
import * as UserService from '../users/users.service';


/**
 * Router Definition
 */
export const favoriteshopsRouter = express.Router();


/**
 * Controller Definitions
 */

//GET favoriteshops/
favoriteshopsRouter.get('/', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const session_id = (req.query.session_id ?? '').toString();
        const session_key = (req.query.session_key ?? '').toString();
        const user = await UserService.checkSession(session_id, session_key, user_ip);

        const priceAlarms = await FavoriteShopsService.getFavoriteShops(user.user_id);

        res.status(200).send(priceAlarms);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// POST favoriteshops/
favoriteshopsRouter.post('/', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const session_id = req.body.session_id;
        const session_key = req.body.session_key;
        const user = await UserService.checkSession(session_id, session_key, user_ip);

        // Get info for price alarm creation
        const vendor_id = req.body.vendor_id;

        if (!vendor_id) {
            // Missing
            res.status(400).send(JSON.stringify({message: 'Missing parameters'}));
            return;
        }

        // Create price alarm
        const success = await FavoriteShopsService.createFavoriteShop(user.user_id, vendor_id);

        if (success) {
            res.status(201).send(JSON.stringify({success: true}));
            return;
        } else {
            res.status(500).send(JSON.stringify({success: false}));
            return;
        }
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// DELETE favoriteshops/
favoriteshopsRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const session_id = (req.query.session_id ?? '').toString();
        const session_key = (req.query.session_key ?? '').toString();
        const user = await UserService.checkSession(session_id, session_key, user_ip);

        // Get info for price alarm creation
        const favorite_id = parseInt(req.params.id, 10);

        if (!favorite_id) {
            // Missing
            res.status(400).send(JSON.stringify({message: 'Missing parameters'}));
            return;
        }

        // Create price alarm
        const success = await FavoriteShopsService.deleteFavoriteShop(user.user_id, favorite_id);

        if (success) {
            res.status(201).send(JSON.stringify({success: true}));
            return;
        } else {
            res.status(500).send(JSON.stringify({success: false}));
            return;
        }
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});
