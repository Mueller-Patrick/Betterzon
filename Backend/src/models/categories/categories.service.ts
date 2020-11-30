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
