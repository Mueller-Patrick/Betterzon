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

import {Manufacturer} from './manufacturer.interface';
import {Manufacturers} from './manufacturers.interface';


/**
 * Service Methods
 */

/**
 * Fetches and returns all known manufacturers
 */
export const findAll = async (): Promise<Manufacturers> => {
    let conn;
    let manRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT manufacturer_id, name FROM manufacturers');
        for (let row in rows) {
            if (row !== 'meta') {
                let man: Manufacturer = {
                    manufacturer_id: 0,
                    name: ''
                };
                const sqlMan = rows[row];

                man.manufacturer_id = sqlMan.manufacturer_id;
                man.name = sqlMan.name;
                manRows.push(man);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return manRows;
};

/**
 * Fetches and returns the manufacturer with the specified id
 * @param id The id of the manufacturer to fetch
 */
export const find = async (id: number): Promise<Manufacturer> => {
    let conn;
    let man: any;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT manufacturer_id, name FROM manufacturers WHERE manufacturer_id = ?', id);
        for (let row in rows) {
            if (row !== 'meta') {
                man = rows[row];
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return man;
};

/**
 * Fetches and returns all manufacturers that match the search term
 * @param term the term to match
 */
export const findBySearchTerm = async (term: string): Promise<Manufacturers> => {
    let conn;
    let manRows = [];
    try {
        conn = await pool.getConnection();
        term = '%' + term + '%';
        const rows = await conn.query('SELECT manufacturer_id, name FROM manufacturers WHERE name LIKE ?', term);
        for (let row in rows) {
            if (row !== 'meta') {
                manRows.push(rows[row]);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return manRows;
};
