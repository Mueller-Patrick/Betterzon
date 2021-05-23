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

import {Crawling_Status} from './crawling_status.interface';
import {Crawling_Statuses} from './crawling_statuses.interface';


/**
 * Service Methods
 */

/**
 * Fetches and returns the current crawling status if the issuing user is an admin
 */
export const getCurrent = async (): Promise<Crawling_Status> => {
    let conn;
    try {
        conn = await pool.getConnection();

        // Get the current crawling process
        let process_info = {
            process_id: -1,
            started_timestamp: new Date(),
            combinations_to_crawl: -1
        };
        const process = await conn.query('SELECT process_id, started_timestamp, combinations_to_crawl FROM crawling_processes ORDER BY started_timestamp DESC LIMIT 1');
        for (let row in process) {
            if (row !== 'meta') {
                process_info = process[row];
            }
        }

        // Get the current status
        let total_crawls = 0;
        let successful_crawls = 0;
        const rows = await conn.query('SELECT COUNT(status_id) as total, SUM(success) as successful FROM crawling_status WHERE process_id = ?', process_info.process_id);
        for (let row in rows) {
            if (row !== 'meta') {
                total_crawls = rows[row].total;
                successful_crawls = rows[row].successful;
            }
        }

        const failed_crawls = total_crawls - successful_crawls;

        return {
            process_id: process_info.process_id,
            started_timestamp: process_info.started_timestamp,
            combinations_to_crawl: process_info.combinations_to_crawl,
            successful_crawls: successful_crawls,
            failed_crawls: failed_crawls,
        }

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};
