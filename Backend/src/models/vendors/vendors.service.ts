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
import {User} from '../users/user.interface';


/**
 * Service Methods
 */

/**
 * Fetches and returns all known vendors
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

/**
 * Fetches and returns the vendor with the specified id
 * @param id The id of the vendor to fetch
 */
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

/**
 * Fetches and returns all vendors that match the search term
 * @param term the term to match
 */
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

/**
 * Get all vendors that have the given user as admin
 * @param user The user to return the managed shops for
 */
export const getManagedShops = async (user_id: number): Promise<Vendors> => {
    let conn;
    let vendorRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT vendor_id, name, streetname, zip_code, city, country_code, phone, website FROM vendors WHERE admin_id LIKE ?', user_id);
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

/**
 * Deactivates a product listing for a specific vendor
 * @param user_id The user id of the issuing user
 * @param vendor_id The vendor id of the vendor to deactivate the listing for
 * @param product_id The product id of the product to deactivate the listing for
 */
export const deactivateListing = async (user_id: number, vendor_id: number, product_id: number): Promise<Boolean> => {
    let conn;
    try {
        conn = await pool.getConnection();

        // Check if the user is authorized to manage the requested vendor
        const user_vendor_rows = await conn.query('SELECT vendor_id FROM vendors WHERE vendor_id = ? AND admin_id = ?', [vendor_id, user_id]);
        if (user_vendor_rows.length !== 1) {
            return false;
        }

        const status = await conn.query('UPDATE prices SET active_listing = false WHERE vendor_id = ? and product_id = ?', [vendor_id, product_id]);

        if(status.affectedRows > 0){
            return true;
        }
        return false;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return false;
};
