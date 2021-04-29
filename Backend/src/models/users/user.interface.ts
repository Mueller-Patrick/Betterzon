export interface User {
    user_id: number;
    username: string;
    email: string;
    password_hash: string;
    hashing_salt: string;
    registration_date: Date;
    last_login_date: Date;
}
