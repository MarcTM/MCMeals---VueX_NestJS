export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export interface User {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    role?: UserRole;
}