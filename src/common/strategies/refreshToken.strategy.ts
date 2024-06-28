import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

/// Refresh token strategy
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'refresh-jwt') {
    constructor(private configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            ignoreExpiration:false,
            secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        });
    }

    validate(payload: any){
        return payload
    }    
}