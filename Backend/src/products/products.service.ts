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

import { Product } from "./product.interface";
import { Products } from "./products.interface";


/**
 * In-Memory Store
 */

const products: Products = {
    1: {
        product_id: 1,
        asin: "",
        is_active: true,
        name: "Burger",
        short_description: "",
        long_description: "",
        image_guid: "",
        date_added: new Date(),
        last_modified: new Date(),
        manufacturer_id: 1,
        selling_rank: "",
        category_id: 1
    },
    2: {
        product_id: 2,
        asin: "",
        is_active: true,
        name: "Pizza",
        short_description: "",
        long_description: "",
        image_guid: "",
        date_added: new Date(),
        last_modified: new Date(),
        manufacturer_id: 2,
        selling_rank: "",
        category_id: 1
    },
    3: {
        product_id: 3,
        asin: "",
        is_active: true,
        name: "Tea",
        short_description: "",
        long_description: "",
        image_guid: "",
        date_added: new Date(),
        last_modified: new Date(),
        manufacturer_id: 3,
        selling_rank: "",
        category_id: 2
    }
};


/**
 * Service Methods
 */

export const findAll = async (): Promise<Products> => {
    let conn;
    let prodRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT product_id, name FROM products WHERE product_id = ?", 1);
        for(let row in rows){
            if(row !== 'meta'){
                prodRows.push(rows[row]);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }

    return prodRows;
};

export const find = async (id: number): Promise<Product> => {
    const record: Product = products[id];

    if (record) {
        return record;
    }

    throw new Error("No record found");
};

export const create = async (newItem: Product): Promise<void> => {
    const product_id = new Date().valueOf();
    products[product_id] = {
        ...newItem,
        product_id
    };
};

export const update = async (updatedItem: Product): Promise<void> => {
    if (products[updatedItem.product_id]) {
        products[updatedItem.product_id] = updatedItem;
        return;
    }

    throw new Error("No record found to update");
};

export const remove = async (id: number): Promise<void> => {
    const record: Product = products[id];

    if (record) {
        delete products[id];
        return;
    }

    throw new Error("No record found to delete");
};
