import * as dotenv from 'dotenv';

dotenv.config();

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
});

/**
 * Data Model Interfaces
 */

import {Contact_Person} from './contact_person.interface';
import {Contact_Persons} from './contact_persons.interface';


/**
 * Service Methods
 */

/**
 * Fetches and returns all known contact persons
 */
export const findAll = async (): Promise<Contact_Persons> => {
    let conn;
    let contRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT contact_person_id, first_name, last_name, gender, email, phone, vendor_id FROM contact_persons');
        for (let row in rows) {
            if (row !== 'meta') {
                contRows.push(rows[row]);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return contRows;
};

/**
 * Fetches and returns the contact person with the specified id
 * @param id The id of the contact person to fetch
 */
export const find = async (id: number): Promise<Contact_Person> => {
    let conn;
    let cont: any;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT contact_person_id, first_name, last_name, gender, email, phone, vendor_id FROM contact_persons WHERE contact_person_id = ?', id);
        for (let row in rows) {
            if (row !== 'meta') {
                cont = rows[row];
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return cont;
};

/**
 * Fetches and returns the contact persons for the specified vendor
 * @param id The id of the vendor to fetch contact persons for
 */
export const findByVendor = async (id: number): Promise<Contact_Persons> => {
    let conn;
    let contRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT contact_person_id, first_name, last_name, gender, email, phone, vendor_id FROM contact_persons WHERE vendor_id = ?', id);
        for (let row in rows) {
            if (row !== 'meta') {
                contRows.push(rows[row]);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return contRows;
};

/**
 * Creates a contact entry record
 * @param user_id The user id of the issuing user
 * @param vendor_id The vendor id of the vendor to create the record for
 * @param first_name The first name of the contact person
 * @param last_name The last name of the contact person
 * @param gender The gender of the contact person
 * @param email The email of the contact person
 * @param phone The phone number of the contact person
 */
export const createContactEntry = async (user_id: number, vendor_id: number, first_name: string, last_name: string, gender: string, email: string, phone: string): Promise<Boolean> => {
    let conn;
    try {
        conn = await pool.getConnection();

        // Check if the user is authorized to manage the requested vendor
        const user_vendor_rows = await conn.query('SELECT vendor_id FROM vendors WHERE vendor_id = ? AND admin_id = ?', [vendor_id, user_id]);
        if (user_vendor_rows.length !== 1) {
            return false;
        }

        // Create contact person entry
        const res = await conn.query('INSERT INTO contact_persons (first_name, last_name, gender, email, phone, vendor_id) VALUES (?, ?, ?, ?, ?, ?)', [first_name, last_name, gender, email, phone, vendor_id]);

        // If there are more / less than 1 affected rows, return false
        return res.affectedRows === 1;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

/**
 * Updates a contact entry record
 * @param user_id The user id of the issuing user
 * @param contact_person_id The id of the record to update
 * @param vendor_id The vendor id of the vendor to create the record for
 * @param first_name The first name of the contact person
 * @param last_name The last name of the contact person
 * @param gender The gender of the contact person
 * @param email The email of the contact person
 * @param phone The phone number of the contact person
 */
export const updateContactEntry = async (user_id: number, contact_person_id: number, vendor_id: number, first_name: string, last_name: string, gender: string, email: string, phone: string): Promise<Boolean> => {
    let conn;
    try {
        conn = await pool.getConnection();

        // Check if the user is authorized to manage the requested vendor
        const user_vendor_rows = await conn.query('SELECT vendor_id FROM vendors WHERE vendor_id = ? AND admin_id = ?', [vendor_id, user_id]);
        if (user_vendor_rows.length !== 1) {
            return false;
        }

        // Create contact person entry
        const res = await conn.query('UPDATE contact_persons SET first_name = ?, last_name = ?, gender = ?, email = ?, phone = ? WHERE contact_person_id = ? AND vendor_id = ?', [first_name, last_name, gender, email, phone, contact_person_id, vendor_id]);

        // If there are more / less than 1 affected rows, return false
        return res.affectedRows === 1;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};
