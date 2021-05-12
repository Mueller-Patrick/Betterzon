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
 */
export const createPriceAlarm = async (user_id: number, product_id: number, defined_price: number): Promise<Boolean> => {
    let conn;
    try {
        conn = await pool.getConnection();
        const affected_rows = await conn.query('INSERT INTO price_alarms (user_id, product_id, defined_price) VALUES (?, ?, ?)', [user_id, product_id, defined_price]);

        console.log(affected_rows);

        return true;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return false;
};
