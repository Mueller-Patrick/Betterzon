export interface User {
    user_id: number;
    username: string;
    email: string;
    password_hash: string;
    registration_date: Date;
    last_login_date: Date;
    is_admin: boolean;
}
