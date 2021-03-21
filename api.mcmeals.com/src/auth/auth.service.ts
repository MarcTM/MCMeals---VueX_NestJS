import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {}


    // Generate JWT
    generateJWT(user: Object): Observable <string> {
        return from(this.jwtService.signAsync({ user }));
    }

    // Hash password when registering
    hashPassword(password: string): Observable <string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    // Compare password and password hashed when logging
    comparePasswords(newPassowrd: string, passwordHash: string): Observable <any | boolean> {
        return of<any | boolean>(bcrypt.compare(newPassowrd, passwordHash));
    }
}
