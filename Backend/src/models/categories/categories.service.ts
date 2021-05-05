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

import {Category} from './category.interface';
import {Categories} from './categories.interface';


/**
 * Service Methods
 */

/**
 * Fetches and returns all known categories
 */
export const findAll = async (): Promise<Categories> => {
    let conn;
    let categRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT category_id, name FROM categories');
        for (let row in rows) {
            if (row !== 'meta') {
                let categ: Category = {
                    category_id: 0,
                    name: ''
                };
                const sqlCateg = rows[row];

                categ.category_id = sqlCateg.category_id;
                categ.name = sqlCateg.name;
                categRows.push(categ);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return categRows;
};

/**
 * Fetches and returns the category with the specified id
 * @param id The id of the category to fetch
 */
export const find = async (id: number): Promise<Category> => {
    let conn;
    let categ: any;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT category_id, name FROM categories WHERE category_id = ?', id);
        for (let row in rows) {
            if (row !== 'meta') {
                categ = rows[row];
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return categ;
};

/**
 * Fetches and returns all categories that match the search term
 * @param term the term to match
 */
export const findBySearchTerm = async (term: string): Promise<Categories> => {
    let conn;
    let categRows = [];
    try {
        conn = await pool.getConnection();
        term = '%' + term + '%';
        const rows = await conn.query('SELECT category_id, name FROM categories WHERE name LIKE ?', term);
        for (let row in rows) {
            if (row !== 'meta') {
                categRows.push(rows[row]);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return categRows;
};
