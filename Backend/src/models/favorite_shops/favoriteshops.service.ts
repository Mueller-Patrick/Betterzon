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

import {FavoriteShop} from './favoriteshop.interface';
import {FavoriteShops} from './favoriteshops.interface';


/**
 * Service Methods
 */

/**
 * Creates a favorite shop entry for the given user for the given shop
 * @param user_id The id of the user to create the favorite shop entry for
 * @param vendor_id The id of the vendor to set as favorite
 */
export const createFavoriteShop = async (user_id: number, vendor_id: number): Promise<boolean> => {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query('INSERT INTO favorite_shops (vendor_id, user_id) VALUES (?, ?)', [vendor_id, user_id]);

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
 * Fetches and returns all favorite shops for the given user
 * @param user_id
 */
export const getFavoriteShops = async (user_id: number): Promise<FavoriteShops> => {
    let conn;
    let shops = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT favorite_id, vendor_id, user_id FROM favorite_shops WHERE user_id = ?', user_id);
        for (let row in rows) {
            if (row !== 'meta') {
                shops.push(rows[row]);
            }
        }

        return shops;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

/**
 * Deletes the given favorite shop entry
 * @param user_id The id of the user that wants to delete the favorite shop entry
 * @param favorite_id The favorite shop to delete
 */
export const deleteFavoriteShop = async (user_id: number, favorite_id: number): Promise<boolean> => {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query('DELETE FROM favorite_shops WHERE favorite_id = ? AND user_id = ?', [favorite_id, user_id]);

        return res.affectedRows === 1;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};
