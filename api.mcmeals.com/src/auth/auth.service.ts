import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {}


    // Generate JWT
    generateJWT(user: Object) {
        return this.jwtService.signAsync({ user });
    }


    // Hash password when registering
    hashPassword(password: string) {
        return bcrypt.hash(password, 12);
    }

    
    // Compare password and password hashed when logging
    comparePasswords(newPassowrd: string, passwordHash: string) {
        return bcrypt.compare(newPassowrd, passwordHash);
    }
}
