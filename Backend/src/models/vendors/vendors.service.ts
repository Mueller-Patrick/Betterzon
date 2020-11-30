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

import {Vendor} from './vendor.interface';
import {Vendors} from './vendors.interface';


/**
 * Service Methods
 */

export const findAll = async (): Promise<Vendors> => {
    let conn;
    let vendorRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT vendor_id, name, streetname, zip_code, city, country_code, phone, website FROM vendors');
        for (let row in rows) {
            if (row !== 'meta') {
                let vendor: Vendor = {
                    city: '',
                    country_code: '',
                    name: '',
                    phone: '',
                    streetname: '',
                    vendor_id: 0,
                    website: '',
                    zip_code: ''
                };
                const sqlVendor = rows[row];

                vendor.vendor_id = sqlVendor.vendor_id;
                vendor.name = sqlVendor.name;
                vendor.streetname = sqlVendor.streetname;
                vendor.zip_code = sqlVendor.zip_code;
                vendor.city = sqlVendor.city;
                vendor.country_code = sqlVendor.country_code;
                vendor.phone = sqlVendor.phone;
                vendor.website = sqlVendor.website;
                vendorRows.push(vendor);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return vendorRows;
};

export const find = async (id: number): Promise<Vendor> => {
    let conn;
    let vendor: any;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT vendor_id, name, streetname, zip_code, city, country_code, phone, website FROM vendors WHERE vendor_id = ?', id);
        for (let row in rows) {
            if (row !== 'meta') {
                vendor = rows[row];
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return vendor;
};

export const findBySearchTerm = async (term: string): Promise<Vendors> => {
    let conn;
    let vendorRows = [];
    try {
        conn = await pool.getConnection();
        term = '%' + term + '%';
        const rows = await conn.query('SELECT vendor_id, name, streetname, zip_code, city, country_code, phone, website FROM vendors WHERE name LIKE ?', term);
        for (let row in rows) {
            if (row !== 'meta') {
                vendorRows.push(rows[row]);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return vendorRows;
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
