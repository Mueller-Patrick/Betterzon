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
        const ip: string = req.connection.remoteAddress ?? '';

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
        res.cookie('betterauth', JSON.stringify({
            id: session.session_id,
            key: session.session_key
        }), {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)}).status(201).send({});
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// POST users/login
usersRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const ip: string = req.connection.remoteAddress ?? '';

        if (!username || !password) {
            // Missing
            res.status(400).send(JSON.stringify({message: 'Missing parameters'}));
            return;
        }

        // Update the user entry and create a session
        const session: Session = await UserService.login(username, password, ip);

        if (!session.session_id) {
            // Error logging in, probably wrong username / password
            res.status(401).send(JSON.stringify({messages: ['Wrong username and / or password'], codes: [1, 4]}));
            return;
        }

        // Send the session details back to the user
        res.cookie('betterauth', JSON.stringify({
            id: session.session_id,
            key: session.session_key
        }), {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)}).status(200).send({});
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// POST users/checkSessionValid
usersRouter.post('/checkSessionValid', async (req: Request, res: Response) => {
    try {
        const ip: string = req.connection.remoteAddress ?? '';

        // Update the user entry and create a session
        const user: User = await UserService.checkSessionWithCookie(req.cookies.betterauth, ip);

        if (!user.user_id) {
            // Error logging in, probably wrong username / password
            res.status(401).send(JSON.stringify({messages: ['Invalid session'], codes: [5]}));
            return;
        }

        // Send the session details back to the user
        res.status(200).send(user);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});
