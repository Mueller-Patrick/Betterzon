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

import {Price} from './price.interface';
import {Prices} from './prices.interface';


/**
 * Service Methods
 */

/**
 * Fetches and returns all known prices
 */
export const findAll = async (): Promise<Prices> => {
    let conn;
    let priceRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices');
        for (let row in rows) {
            if (row !== 'meta') {
                let price: Price = {
                    price_id: 0,
                    price_in_cents: 0,
                    product_id: 0,
                    timestamp: new Date(),
                    vendor_id: 0
                };
                const sqlPrice = rows[row];

                price.price_id = sqlPrice.price_id;
                price.product_id = sqlPrice.product_id;
                price.vendor_id = sqlPrice.vendor_id;
                price.price_in_cents = sqlPrice.price_in_cents;
                price.timestamp = sqlPrice.timestamp;
                priceRows.push(price);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return priceRows;
};

/**
 * Fetches and returns the price with the specified id
 * @param id The id of the price to fetch
 */
export const find = async (id: number): Promise<Price> => {
    let conn;
    let price: any;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices WHERE price_id = ?', id);
        for (let row in rows) {
            if (row !== 'meta') {
                price = rows[row];
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return price;
};

/**
 * Fetches and returns all prices that belong to the specified product
 * @param product the product to fetch the prices for
 */
export const findByProduct = async (product: number): Promise<Prices> => {
    let conn;
    let priceRows = [];
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices WHERE product_id = ?', product);
        for (let row in rows) {
            if (row !== 'meta') {
                priceRows.push(rows[row]);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return priceRows;
};

/**
 * Fetches and returns prices that belong to the specified product.
 * If type is newest, only the newest prices for each vendor will be returned.
 * If type is lowest, the lowest daily price for the product is returned.
 * Otherwise, all prices for this product are returned.
 * @param product The product to fetch the prices for
 * @param type The type of prices, e.g. newest / lowest
 */
export const findByType = async (product: string, type: string): Promise<Prices> => {
    let conn;
    let priceRows = [];
    try {
        conn = await pool.getConnection();
        let rows = [];
        if (type === 'newest') {
            // Used to get the newest price for this product per vendor
            rows = await conn.query(('WITH summary AS ( ' +
                'SELECT p.product_id, ' +
                'p.vendor_id, ' +
                'p.price_in_cents, ' +
                'p.timestamp, ' +
                'ROW_NUMBER() OVER( ' +
                'PARTITION BY p.vendor_id ' +
                'ORDER BY p.timestamp DESC) AS rk ' +
                'FROM prices p ' +
                'WHERE product_id = ? AND vendor_id != 1) ' +
                'SELECT s.* ' +
                'FROM summary s ' +
                'WHERE s.rk = 1 '), product);
        } else if (type === 'lowest') {
            // Used to get the lowest prices for this product over a period of time
            rows = await conn.query('SELECT price_id, product_id, vendor_id, MIN(price_in_cents) as price_in_cents, timestamp FROM prices WHERE product_id = ? AND vendor_id != 1 GROUP BY DAY(timestamp) ORDER BY timestamp', product);
        } else {
            // If no type is given, return all prices for this product
            rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices WHERE product_id = ? AND vendor_id != 1', product);
        }

        for (let row in rows) {
            if (row !== 'meta') {
                priceRows.push(rows[row]);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return priceRows;
};

/**
 * Fetches and returns prices that belong to the specified product and vendor.
 * If type is newest, only the newest known price for the product at the vendor is returned.
 * If type is lowest, only the lowest ever known price for the product at the vendor is returned.
 * Otherwise, all prices for this product are returned.
 * @param product The product to fetch the prices for
 * @param vendor The vendor to fetch the prices for
 * @param type The type of prices, e.g. newest / lowest
 */
export const findByVendor = async (product: string, vendor: string, type: string): Promise<Prices> => {
    let conn;
    let priceRows = [];
    try {
        conn = await pool.getConnection();
        let rows = [];
        if (type === 'newest') {
            // Used to get the newest price for this product and vendor
            rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices WHERE product_id = ? AND vendor_id = ? ORDER BY timestamp DESC LIMIT 1', [product, vendor]);
        } else if (type === 'lowest') {
            // Used to get the lowest prices for this product and vendor in all time
            rows = await conn.query('SELECT price_id, product_id, vendor_id, MIN(price_in_cents) as price_in_cents, timestamp FROM prices WHERE product_id = ? AND vendor_id = ? LIMIT 1', [product, vendor]);
        } else {
            // If no type is given, return all prices for this product and vendor
            rows = await conn.query('SELECT price_id, product_id, vendor_id, price_in_cents, timestamp FROM prices WHERE product_id = ? AND vendor_id = ?', [product, vendor]);
        }

        for (let row in rows) {
            if (row !== 'meta') {
                priceRows.push(rows[row]);
            }
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return priceRows;
};

/**
 * Fetches and returns the best current deals, i.e. the non-amazon prices that have the biggest difference to amazon prices.
 * Only the latest known prices for every vendor are taken into consideration so we only get up-to-date-deals.
 * @param amount The amount of deals to return
 */
export const getBestDeals = async (amount: number): Promise<Prices> => {
    let conn;
    let priceRows = [];
    try {
        conn = await pool.getConnection();

        let allPrices: Record<number, Price[]> = {};

        // Get newest prices for every product at every vendor
        const rows = await conn.query(
            'WITH summary AS (\n' +
            '    SELECT p.product_id,\n' +
            '           p.vendor_id,\n' +
            '           p.price_in_cents,\n' +
            '           p.timestamp,\n' +
            '           ROW_NUMBER() OVER(\n' +
            '               PARTITION BY p.product_id, p.vendor_id\n' +
            '               ORDER BY p.timestamp DESC) AS rk\n' +
            '    FROM prices p)\n' +
            'SELECT s.*\n' +
            'FROM summary s\n' +
            'WHERE s.rk = 1');

        // Write returned values to allPrices map with product id as key and a list of prices as value
        for (let row in rows) {
            if (row !== 'meta') {
                if (!allPrices[parseInt(rows[row].product_id)]) {
                    allPrices[parseInt(rows[row].product_id)] = [];
                }

                allPrices[parseInt(rows[row].product_id)].push(rows[row]);
            }
        }

        // Iterate over all prices to find the products with the biggest difference between amazon and other vendor
        let deals: Price[] = [];

        Object.keys(allPrices).forEach(productId => {
            if (allPrices[parseInt(productId)]) {
                let pricesForProd = allPrices[parseInt(productId)];

                // Get amazon price and lowest price from other vendor
                let amazonPrice = {} as Price;
                let lowestPrice = {} as Price;
                pricesForProd.forEach(function(price, priceIndex) {
                    if (price.vendor_id === 1) {
                        amazonPrice = price;
                    } else {
                        // If there is no lowest price yet or the price of the current iteration is lower, set / replace it
                        if (!lowestPrice.price_in_cents || lowestPrice.price_in_cents > price.price_in_cents) {
                            lowestPrice = price;
                        }
                    }
                });

                // Create deal object and add it to list
                let deal = {
                    'product_id': lowestPrice.product_id,
                    'vendor_id': lowestPrice.vendor_id,
                    'price_in_cents': lowestPrice.price_in_cents,
                    'timestamp': lowestPrice.timestamp,
                    'amazonDifference': (amazonPrice.price_in_cents - lowestPrice.price_in_cents),
                    'amazonDifferencePercent': ((1 - (lowestPrice.price_in_cents / amazonPrice.price_in_cents)) * 100),
                };

                // Push only deals were the amazon price is actually higher
                if (deal.amazonDifferencePercent > 0) {
                    deals.push(deal as Price);
                }
            }
        });

        // Sort to have the best deals on the top
        deals.sort((a, b) => a.amazonDifferencePercent! < b.amazonDifferencePercent! ? 1 : -1);

        // Return only as many records as requested or the maximum amount of found deals, whatever is less
        let maxAmt = Math.min(amount, deals.length);

        for (let dealIndex = 0; dealIndex < maxAmt; dealIndex++) {
            //console.log(deals[dealIndex]);
            priceRows.push(deals[dealIndex] as Price);
        }

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return priceRows;
};

/**
 * Fetches and returns the lowest, latest, non-amazon price for each given product
 * @param ids the ids of the products
 */
export const findListByProducts = async (productIds: [number]): Promise<Prices> => {
    let conn;
    let priceRows: Price[] = [];
    try {
        conn = await pool.getConnection();

        let allPrices: Record<number, Price[]> = {};

        // Get newest prices for every given product at every vendor
        const rows = await conn.query(
            'WITH summary AS (\n' +
            '    SELECT p.product_id,\n' +
            '           p.vendor_id,\n' +
            '           p.price_in_cents,\n' +
            '           p.timestamp,\n' +
            '           ROW_NUMBER() OVER(\n' +
            '               PARTITION BY p.product_id, p.vendor_id\n' +
            '               ORDER BY p.timestamp DESC) AS rk\n' +
            '    FROM prices p' +
            '    WHERE p.product_id IN (?)' +
            '    AND p.vendor_id != 1)\n' +
            'SELECT s.*\n' +
            'FROM summary s\n' +
            'WHERE s.rk = 1', [productIds]);

        // Write returned values to allPrices map with product id as key and a list of prices as value
        for (let row in rows) {
            if (row !== 'meta') {
                if (!allPrices[parseInt(rows[row].product_id)]) {
                    allPrices[parseInt(rows[row].product_id)] = [];
                }

                allPrices[parseInt(rows[row].product_id)].push(rows[row]);
            }
        }

        // Iterate over all products to find lowest price
        Object.keys(allPrices).forEach(productId => {
            if (allPrices[parseInt(productId)]) {
                let pricesForProd = allPrices[parseInt(productId)];

                // Sort ascending by price so index 0 has the lowest price
                pricesForProd.sort((a, b) => a.price_in_cents > b.price_in_cents ? 1 : -1);

                // Push the lowest price to the return list
                priceRows.push(pricesForProd[0]);
            }
        });

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return priceRows;
};
