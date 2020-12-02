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

import {Product} from './product.interface';
import {Products} from './products.interface';


/**
 * Service Methods
 */

export const findAll = async (): Promise<Products> => {
    let conn;
    let prodRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT product_id, name, asin, is_active, short_description, long_description, image_guid, date_added, last_modified, manufacturer_id, selling_rank, category_id FROM products');
        for (let row in rows) {
            if (row !== 'meta') {
                let prod: Product = {
                    asin: '',
                    category_id: 0,
                    date_added: new Date(),
                    image_guid: '',
                    is_active: false,
                    last_modified: new Date(),
                    long_description: '',
                    manufacturer_id: 0,
                    name: '',
                    product_id: 0,
                    selling_rank: '',
                    short_description: ''
                };
                const sqlProd = rows[row];

                prod.product_id = sqlProd.product_id;
                prod.name = sqlProd.name;
                prod.asin = sqlProd.asin;
                prod.is_active = sqlProd.is_active;
                prod.short_description = sqlProd.short_description;
                prod.long_description = sqlProd.long_description;
                prod.image_guid = sqlProd.image_guid;
                prod.date_added = sqlProd.date_added;
                prod.last_modified = sqlProd.last_modified;
                prod.manufacturer_id = sqlProd.manufacturer_id;
                prod.selling_rank = sqlProd.selling_rank;
                prod.category_id = sqlProd.category_id;
                prodRows.push(prod);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return prodRows;
};

export const find = async (id: number): Promise<Product> => {
    let conn;
    let prod: any;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT product_id, name, asin, is_active, short_description, long_description, image_guid, date_added, last_modified, manufacturer_id, selling_rank, category_id FROM products WHERE product_id = ?', id);
        for (let row in rows) {
            if (row !== 'meta') {
                prod = rows[row];
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return prod;
};

export const findBySearchTerm = async (term: string): Promise<Products> => {
    let conn;
    let prodRows = [];
    try {
        conn = await pool.getConnection();
        term = '%' + term + '%';
        const rows = await conn.query('SELECT product_id, name, asin, is_active, short_description, long_description, image_guid, date_added, last_modified, manufacturer_id, selling_rank, category_id FROM products WHERE name LIKE ?', term);
        for (let row in rows) {
            if (row !== 'meta') {
                prodRows.push(rows[row]);
            }
        }

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return prodRows;
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
