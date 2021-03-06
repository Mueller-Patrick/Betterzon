import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import {Guid} from 'guid-typescript';


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

import {User} from './user.interface';
import {Users} from './users.interface';
import {Session} from './session.interface';


/**
 * Service Methods
 */

/**
 * Creates a user record in the database, also creates a session. Returns the session if successful.
 */
export const createUser = async (username: string, password: string, email: string, ip: string): Promise<Session> => {
    let conn;
    try {
        // Hash password and generate + hash session key
        const pwHash = bcrypt.hashSync(password, 10);
        const sessionKey = Guid.create().toString();
        const sessionKeyHash = bcrypt.hashSync(sessionKey, 10);

        // Create user entry in SQL
        conn = await pool.getConnection();
        const userQuery = 'INSERT INTO users (username, email, bcrypt_password_hash) VALUES (?, ?, ?) RETURNING user_id';
        const userIdRes = await conn.query(userQuery, [username, email, pwHash]);
        await conn.commit();

        // Get user id of the created user
        let userId: number = -1;
        for (const row in userIdRes) {
            if (row !== 'meta' && userIdRes[row].user_id != null) {
                userId = userIdRes[row].user_id;
            }
        }

        // Create session
        const sessionQuery = 'INSERT INTO sessions (user_id, session_key_hash, createdDate, lastLogin, validUntil, validDays, last_IP) VALUES (?,?,NOW(),NOW(),DATE_ADD(NOW(), INTERVAL 30 DAY),30,?) RETURNING session_id';
        const sessionIdRes = await conn.query(sessionQuery, [userId, sessionKeyHash, ip]);
        await conn.commit();

        // Get session id of the created session
        let sessionId: number = -1;
        for (const row in sessionIdRes) {
            if (row !== 'meta' && sessionIdRes[row].session_id != null) {
                sessionId = sessionIdRes[row].session_id;
            }
        }

        return {
            session_id: sessionId,
            session_key: sessionKey,
            session_key_hash: 'HIDDEN',
            last_IP: ip
        };

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return {} as Session;
};

/**
 * Checks if the given credentials are valid and creates a new session if they are.
 * Returns the session information in case of a successful login
 */
export const login = async (username: string, password: string, ip: string): Promise<Session> => {
    let conn;
    try {
        // Get saved password hash
        conn = await pool.getConnection();
        const query = 'SELECT user_id, bcrypt_password_hash FROM users WHERE username = ?';
        const userRows = await conn.query(query, username);
        let savedHash = '';
        let userId = -1;
        for (const row in userRows) {
            if (row !== 'meta' && userRows[row].user_id != null) {
                savedHash = userRows[row].bcrypt_password_hash;
                userId = userRows[row].user_id;
            }
        }

        // Check for correct password
        if (!bcrypt.compareSync(password, savedHash)) {
            // Wrong password, return invalid
            return {} as Session;
        }
        // Password is valid, continue

        // Generate + hash session key
        const sessionKey = Guid.create().toString();
        const sessionKeyHash = bcrypt.hashSync(sessionKey, 10);

        // Update user entry in SQL
        const userQuery = 'UPDATE users SET last_login_date = NOW() WHERE user_id = ?';
        const userIdRes = await conn.query(userQuery, userId);
        await conn.commit();

        // Create session
        const sessionQuery = 'INSERT INTO sessions (user_id, session_key_hash, createdDate, lastLogin, validUntil, validDays, last_IP) VALUES (?,?,NOW(),NOW(),DATE_ADD(NOW(), INTERVAL 30 DAY),30,?) RETURNING session_id';
        const sessionIdRes = await conn.query(sessionQuery, [userId, sessionKeyHash, ip]);
        await conn.commit();

        // Get session id of the created session
        let sessionId: number = -1;
        for (const row in sessionIdRes) {
            if (row !== 'meta' && sessionIdRes[row].session_id != null) {
                sessionId = sessionIdRes[row].session_id;
            }
        }

        return {
            session_id: sessionId,
            session_key: sessionKey,
            session_key_hash: 'HIDDEN',
            last_IP: ip
        };

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }

    return {} as Session;
};

/**
 * Checks if the given session information are valid and returns the user information if they are
 */
export const checkSession = async (sessionId: string, sessionKey: string, ip: string): Promise<User> => {
    let conn;
    try {
        // Get saved session key hash
        conn = await pool.getConnection();
        const query = 'SELECT user_id, session_key_hash, validUntil FROM sessions WHERE session_id = ?';
        const sessionRows = await conn.query(query, sessionId);
        let savedHash = '';
        let userId = -1;
        let validUntil = new Date();
        for (const row in sessionRows) {
            if (row !== 'meta' && sessionRows[row].user_id != null) {
                savedHash = sessionRows[row].session_key_hash;
                userId = sessionRows[row].user_id;
                validUntil = sessionRows[row].validUntil;
            }
        }

        // Check for correct key
        if (!bcrypt.compareSync(sessionKey, savedHash)) {
            // Wrong key, return invalid
            return {} as User;
        }
        // Key is valid, continue

        // Check if the session is still valid
        if (validUntil <= new Date()) {
            // Session expired, return invalid
            return {} as User;
        }
        // Session still valid, continue

        // Update session entry in SQL
        const updateSessionsQuery = 'UPDATE sessions SET lastLogin = NOW(), last_IP = ? WHERE session_id = ?';
        const updateUsersQuery = 'UPDATE users SET last_login_date = NOW() WHERE user_id = ?';
        const userIdRes = await conn.query(updateSessionsQuery, [ip, sessionId]);
        await conn.query(updateUsersQuery, userId);
        await conn.commit();

        // Get the other required user information and update the user
        const userQuery = 'SELECT user_id, username, email, registration_date, last_login_date, is_admin FROM users WHERE user_id = ?';
        const userRows = await conn.query(userQuery, userId);
        let username = '';
        let email = '';
        let registrationDate = new Date();
        let lastLoginDate = new Date();
        let is_admin = false;
        for (const row in userRows) {
            if (row !== 'meta' && userRows[row].user_id != null) {
                username = userRows[row].username;
                email = userRows[row].email;
                registrationDate = userRows[row].registration_date;
                lastLoginDate = userRows[row].last_login_date;
                is_admin = userRows[row].is_admin;
            }
        }

        // Everything is fine, return user information
        return {
            user_id: userId,
            username: username,
            email: email,
            password_hash: 'HIDDEN',
            registration_date: registrationDate,
            last_login_date: lastLoginDate,
            is_admin: is_admin
        };

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

/**
 * Calls the checkSession method after extracting the required information from the authentication cookie
 * @param cookie The betterauth cookie
 * @param ip The users IP address
 */
export const checkSessionWithCookie = async (cookie: any, ip: string): Promise<User> => {
    const parsedCookie = JSON.parse(cookie);
    const session_id = parsedCookie.id;
    const session_key = parsedCookie.key;


    return checkSession(session_id, session_key, '');
};

/**
 * Used in the checkUsernameAndEmail method as return value
 */
export interface Status {
    hasProblems: boolean;
    messages: string[];
    codes: number[]; // 0 = all good, 1 = wrong username, 2 = wrong email, 3 = server error, 4 = wrong password, 5 = wrong session
}

/**
 * Checks if the given username and email are not used yet by another user
 * @param username The username to check
 * @param email The email to check
 */
export const checkUsernameAndEmail = async (username: string, email: string): Promise<Status> => {
    let conn;
    try {
        // Create user entry in SQL
        conn = await pool.getConnection();
        const usernameQuery = 'SELECT username FROM users WHERE username = ?';
        const emailQuery = 'SELECT email FROM users WHERE email = ?';
        const usernameRes = await conn.query(usernameQuery, username);
        const emailRes = await conn.query(emailQuery, email);

        let res: Status = {
            hasProblems: false,
            messages: [],
            codes: []
        };

        const usernameRegex = RegExp('^[a-zA-Z0-9\\-\\_]{4,20}$'); // Can contain a-z, A-Z, 0-9, -, _ and has to be 4-20 chars long
        if (!usernameRegex.test(username)) {
            // Username doesn't match requirements
            res.hasProblems = true;
            res.messages.push('Invalid username');
            res.codes.push(1);
        }

        const emailRegex = RegExp('^[a-zA-Z0-9\\-\\_.]{1,30}\\@[a-zA-Z0-9\\-.]{1,20}\\.[a-z]{1,20}$'); // Normal email regex, user@betterzon.xyz
        if (!emailRegex.test(email)) {
            // Username doesn't match requirements
            res.hasProblems = true;
            res.messages.push('Invalid email');
            res.codes.push(2);
        }

        if (usernameRes.length > 0) {
            // Username is a duplicate
            res.hasProblems = true;
            res.messages.push('Duplicate username');
            res.codes.push(1);
        }

        if (emailRes.length > 0) {
            // Email is a duplicate
            res.hasProblems = true;
            res.messages.push('Duplicate email');
            res.codes.push(2);
        }

        return res;

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.end();
        }
    }
};
