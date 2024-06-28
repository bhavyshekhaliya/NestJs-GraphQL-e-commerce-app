import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload = {
    phoneNumber: string
}

/// Access token strategy
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,'access-jwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
        })
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}