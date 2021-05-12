/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as PriceAlarmsService from './pricealarms.service';
import {PriceAlarm} from './pricealarm.interface';
import {PriceAlarms} from './pricealarms.interface';
import * as UserService from '../users/users.service';


/**
 * Router Definition
 */
export const pricealarmsRouter = express.Router();


/**
 * Controller Definitions
 */

// POST priceAlarms/create
pricealarmsRouter.post('/create', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const session_id = req.body.session_id;
        const session_key = req.body.session_key;
        const user_ip = req.connection.remoteAddress ?? '';

        if (!session_id || !session_key) {
            // Missing
            res.status(400).send(JSON.stringify({message: 'Missing parameters'}));
            return;
        }

        const user = await UserService.checkSession(session_id, session_key, user_ip);

        // Get info for price alarm creation
        const product_id = req.body.product_id;
        const defined_price = req.body.defined_price;

        if (!product_id || !defined_price) {
            // Missing
            res.status(400).send(JSON.stringify({message: 'Missing parameters'}));
            return;
        }

        // Create price alarm
        const success = await PriceAlarmsService.createPriceAlarm(user.user_id, product_id, defined_price);

        if(success) {
            res.status(200).send(JSON.stringify({success: true}));
            return;
        } else {
            res.status(400).send(JSON.stringify({success: false}));
            return;
        }
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({"message": "Internal Server Error. Try again later."}));
    }
});
