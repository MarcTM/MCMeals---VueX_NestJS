import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            igonreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    
    // Validate user
    validate(payload: any) {
        return { 'user': payload.user };
    }
}