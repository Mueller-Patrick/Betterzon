/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as UserService from './users.service';
import {User} from './user.interface';
import {Users} from './users.interface';
import {Session} from './session.interface';


/**
 * Router Definition
 */

export const usersRouter = express.Router();


/**
 * Controller Definitions
 */

// POST users/register
usersRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const email: string = req.body.email;
        const ip: string = req.connection.remoteAddress?? '';

        if (!username || !password || !email) {
            // Missing
            res.status(400).send(JSON.stringify({message: 'Missing parameters'}));
            return;
        }

        // Check if username and / or email are already used
        const status = await UserService.checkUsernameAndEmail(username, email);

        if (status.hasProblems) {
            // Username and/or email are duplicates, return error
            res.status(400).send(JSON.stringify({messages: status.messages, codes: status.codes}));
            return;
        }

        // Create the user and a session
        const session: Session = await UserService.createUser(username, password, email, ip);

        // Send the session details back to the user
        res.status(201).send(session);
    } catch (e) {
        res.status(404).send(e.message);
    }
});
