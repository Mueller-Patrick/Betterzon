/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express';
import * as ContactPersonService from './contact_persons.service';
import {Contact_Person} from './contact_person.interface';
import {Contact_Persons} from './contact_persons.interface';
import * as UserService from '../users/users.service';
import * as PriceService from '../prices/prices.service';


/**
 * Router Definition
 */

export const contactpersonsRouter = express.Router();


/**
 * Controller Definitions
 */

// GET contactpersons/
contactpersonsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const contacts: Contact_Persons = await ContactPersonService.findAll();

        res.status(200).send(contacts);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// GET contactpersons/:id
contactpersonsRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const contact: Contact_Person = await ContactPersonService.find(id);

        res.status(200).send(contact);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// GET contactpersons/byvendor/:id
contactpersonsRouter.get('/byvendor/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (!id) {
        res.status(400).send('Missing parameters.');
        return;
    }

    try {
        const contacts: Contact_Persons = await ContactPersonService.findByVendor(id);

        res.status(200).send(contacts);
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// POST contactpersons/
contactpersonsRouter.post('/', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const user = await UserService.checkSessionWithCookie(req.cookies.betterauth, user_ip);

        // Get required parameters
        const vendor_id = req.body.vendor_id;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const gender = req.body.gender;
        const email = req.body.email;
        const phone = req.body.phone;

        const success = await ContactPersonService.createContactEntry(user.user_id, vendor_id, first_name, last_name, gender, email, phone);

        if (success) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});

// PUT contactpersons/:id
contactpersonsRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        // Authenticate user
        const user_ip = req.connection.remoteAddress ?? '';
        const user = await UserService.checkSessionWithCookie(req.cookies.betterauth, user_ip);

        // Get required parameters
        const contact_person_id = parseInt(req.params.id, 10);
        const vendor_id = req.body.vendor_id;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const gender = req.body.gender;
        const email = req.body.email;
        const phone = req.body.phone;

        const success = await ContactPersonService.updateContactEntry(user.user_id, contact_person_id, vendor_id, first_name, last_name, gender, email, phone);

        if (success) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch (e) {
        console.log('Error handling a request: ' + e.message);
        res.status(500).send(JSON.stringify({'message': 'Internal Server Error. Try again later.'}));
    }
});
