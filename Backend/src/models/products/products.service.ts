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
import * as http from 'http';


/**
 * Service Methods
 */

/**
 * Fetches and returns all known products
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

/**
 * Fetches and returns the product with the specified id
 * @param id The id of the product to fetch
 */
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

/**
 * Fetches and returns all products that match the search term
 * @param term the term to match
 */
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

/**
 * Fetches and returns the product details for the given list of product ids
 * @param ids The list of product ids to fetch the details for
 */
export const findList = async (ids: [number]): Promise<Products> => {
    let conn;
    let prodRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT product_id, name, asin, is_active, short_description, long_description, image_guid, date_added, last_modified, manufacturer_id, selling_rank, category_id FROM products WHERE product_id IN (?)', [ids]);
        for (let row in rows) {
            if (row !== 'meta') {
                prodRows.push(rows[row]);
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

/**
 * Fetches and returns the products that the given vendor has price entries for
 * @param id The id of the vendor to fetch the products for
 */
export const findByVendor = async (id: number): Promise<Products> => {
    let conn;
    let prodRows = [];
    try {
        conn = await pool.getConnection();

        // Get the relevant product ids
        let relevant_prod_ids = [];
        const relevantProds = await conn.query('SELECT product_id FROM prices WHERE vendor_id = ? GROUP BY product_id', id);
        for (let row in relevantProds) {
            if (row !== 'meta') {
                relevant_prod_ids.push(relevantProds[row].product_id);
            }
        }

        // Fetch products
        const rows = await conn.query('SELECT product_id, name, asin, is_active, short_description, long_description, image_guid, date_added, last_modified, manufacturer_id, selling_rank, category_id FROM products WHERE product_id IN (?)', [relevant_prod_ids]);
        for (let row in rows) {
            if (row !== 'meta') {
                prodRows.push(rows[row]);
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

/**
 * Makes a callout to a crawler instance to search for the requested product
 * @param asin The amazon asin of the product to look for
 */
export const addNewProduct = async (asin: string): Promise<boolean> => {
    try {
        let options = {
            host: 'crawl.p4ddy.com',
            path: '/searchNew',
            port: '443',
            method: 'POST'
        };

        let req = http.request(options, res => {
            return res.statusCode === 202;
        });
        req.write(JSON.stringify({
            asin: asin,
            key: process.env.CRAWLER_ACCESS_KEY
        }));
        req.end();
    } catch (err) {
        console.log(err);
        throw(err);
    }

    return false;
};
