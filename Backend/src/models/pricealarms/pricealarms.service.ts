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

import {PriceAlarm} from './pricealarm.interface';
import {PriceAlarms} from './pricealarms.interface';


/**
 * Service Methods
 */

/**
 * Creates a price alarm for the given user for the product with the defined price
 * @param user_id The id of the user to create the price alarm for
 * @param product_id The id of the product to create the price alarm for
 * @param defined_price The defined price for the price alarm
 */
export const createPriceAlarm = async (user_id: number, product_id: number, defined_price: number): Promise<boolean> => {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query('INSERT INTO price_alarms (user_id, product_id, defined_price) VALUES (?, ?, ?)', [user_id, product_id, defined_price]);

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
 * Fetches and returns all price alarms for the given user
 * @param user_id
 */
export const getPriceAlarms = async (user_id: number): Promise<PriceAlarms> => {
    let conn;
    let priceAlarms = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT alarm_id, user_id, product_id, defined_price FROM price_alarms WHERE user_id = ?', user_id);
        for (let row in rows) {
            if (row !== 'meta') {
                priceAlarms.push(rows[row]);
            }
        }

        return priceAlarms;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

/**
 * Updates the given price alarm with the given fields
 * @param alarm_id The id of the price alarm to update
 * @param user_id The id of the user that wants to update the price alarm
 * @param defined_price The defined price for the price alarm
 */
export const updatePriceAlarm = async (alarm_id: number, user_id: number, defined_price: number): Promise<boolean> => {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query('UPDATE price_alarms SET defined_price = ? WHERE alarm_id = ? AND user_id = ?', [defined_price, alarm_id, user_id]);

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
 * Deletes the given price alarm
 * @param alarm_id The id of the price alarm to update
 * @param user_id The id of the user that wants to update the price alarm
 */
export const deletePriceAlarm = async (alarm_id: number, user_id: number): Promise<boolean> => {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query('DELETE FROM price_alarms WHERE alarm_id = ? AND user_id = ?', [alarm_id, user_id]);

        return res.affectedRows === 1;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};
