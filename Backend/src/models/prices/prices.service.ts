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

export const findByType = async (product: string, type: string): Promise<Prices> => {
    let conn;
    let priceRows = [];
    try {
        conn = await pool.getConnection();
        let rows = [];
        if (type === 'newest') {
            // Used to get the newest price for this product per vendor
            rows = await conn.query(('WITH summary AS ( ' +
                'SELECT p.product_id, ' +
                'p.vendor_id, ' +
                'p.price_in_cents, ' +
                'p.timestamp, ' +
                'ROW_NUMBER() OVER( ' +
                'PARTITION BY p.vendor_id ' +
                'ORDER BY p.timestamp DESC) AS rk ' +
                'FROM prices p ' +
                'WHERE product_id = ? AND vendor_id != 1) ' +
                'SELECT s.* ' +
                'FROM summary s ' +
                'WHERE s.rk = 1 '), product);
        } else if (type === 'lowest') {
            // Used to get the lowest prices for this product over a period of time
            rows = await conn.query('SELECT price_id, product_id, vendor_id, MIN(price_in_cents) as price_in_cents, timestamp FROM prices WHERE product_id = ? AND vendor_id != 1 GROUP BY DAY(timestamp) ORDER BY timestamp', product);
        } else {
            // If no type is given, return all prices for this product
            rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices WHERE product_id = ? AND vendor_id != 1', product);
        }

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

export const findByVendor = async (product: string, vendor: string, type: string): Promise<Prices> => {
    let conn;
    let priceRows = [];
    try {
        conn = await pool.getConnection();
        let rows = [];
        if (type === 'newest') {
            // Used to get the newest price for this product and vendor
            rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices WHERE product_id = ? AND vendor_id = ? ORDER BY timestamp DESC LIMIT 1', [product, vendor]);
        } else if (type === 'lowest') {
            // Used to get the lowest prices for this product and vendor in all time
            rows = await conn.query('SELECT price_id, product_id, vendor_id, MIN(price_in_cents) as price_in_cents, timestamp FROM prices WHERE product_id = ? AND vendor_id = ? LIMIT 1', [product, vendor]);
        } else {
            // If no type is given, return all prices for this product and vendor
            rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices WHERE product_id = ? AND vendor_id = ?', [product, vendor]);
        }

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
