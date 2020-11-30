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

import {Price} from './price.interface';
import {Prices} from './prices.interface';


/**
 * Service Methods
 */

export const findAll = async (): Promise<Prices> => {
    let conn;
    let priceRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices');
        for (let row in rows) {
            if (row !== 'meta') {
                let price: Price = {
                    price_id: 0,
                    price_in_cents: 0,
                    product_id: 0,
                    timestamp: new Date(),
                    vendor_id: 0
                };
                const sqlPrice = rows[row];

                price.price_id = sqlPrice.price_id;
                price.product_id = sqlPrice.product_id;
                price.vendor_id = sqlPrice.vendor_id;
                price.price_in_cents = sqlPrice.price_in_cents;
                price.timestamp = sqlPrice.timestamp;
                priceRows.push(price);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return priceRows;
};

export const find = async (id: number): Promise<Price> => {
    let conn;
    let price: any;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices WHERE price_id = ?', id);
        for (let row in rows) {
            if (row !== 'meta') {
                price = rows[row];
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return price;
};

export const findByProduct = async (product: number): Promise<Prices> => {
    let conn;
    let priceRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices WHERE product_id = ?', product);
        for (let row in rows) {
            if (row !== 'meta') {
                priceRows.push(rows[row]);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return priceRows;
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
