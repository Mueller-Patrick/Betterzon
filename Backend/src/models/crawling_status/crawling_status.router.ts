/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as CrawlingStatusService from './crawling_status.service';
import {Crawling_Status} from './crawling_status.interface';
import {Crawling_Statuses} from './crawling_statuses.interface';
import * as UserService from '../users/users.service';


/**
 * Router Definition
 */

export const crawlingstatusRouter = express.Router();


/**
 * Controller Definitions
 */

// GET crawlingstatus/
crawlingstatusRouter.get('/', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const session_id = (req.query.session_id ?? '').toString();
        const session_key = (req.query.session_key ?? '').toString();
        const user = await UserService.checkSession(session_id, session_key, user_ip);

        if (!user.is_admin) {
            res.status(403).send({});
            return;
        }

        const status: Crawling_Status = await CrawlingStatusService.getCurrent();

        res.status(200).send(status);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});
