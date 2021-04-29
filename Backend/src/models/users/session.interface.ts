export interface Session {
    session_id: number;
    session_key: string;
    session_key_hash: string;
    createdDate?: Date;
    lastLogin?: Date;
    validUntil?: Date;
    validDays?: number;
    last_IP: string;
}
