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

// export const create = async (newItem: Product): Promise<void> => {
//     let conn;
//     try {
//         conn = await pool.getConnection();
//         await conn.query("");
//
//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) conn.end();
//     }
// };
//
// export const update = async (updatedItem: Product): Promise<void> => {
//     if (models.products[updatedItem.product_id]) {
//         models.products[updatedItem.product_id] = updatedItem;
//         return;
//     }
//
//     throw new Error("No record found to update");
// };
//
// export const remove = async (id: number): Promise<void> => {
//     const record: Product = models.products[id];
//
//     if (record) {
//         delete models.products[id];
//         return;
//     }
//
//     throw new Error("No record found to delete");
// };
