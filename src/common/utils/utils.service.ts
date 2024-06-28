import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UtilService {

    constructor(
        private jwtService:JwtService,
        private configService: ConfigService
    ) {}

    /// Get Access And Refresh Token
    async getTokens(userId: string) {
        const [ accessToken, refreshToken ] = await Promise.all([
            this.jwtService.signAsync(
                {
                    userId
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '1d',
                }
            ),
            this.jwtService.signAsync(
                {
                    userId
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                }
            )
        ]);

        return {
            accessToken,
            refreshToken
        }
    }

    /// Get Only Access Token
    async getAccessToken(refreshToken: string) {
        const [ accessToken ] = await Promise.all([
            this.jwtService.signAsync(
                {
                    refreshToken
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '1800s',
                }
            )
        ]);

        return accessToken;
    }

    /// For Hashing The data
    hashData(data: string, saltOrRounds: string | number) {
        return bcrypt.hash(data,saltOrRounds);
    } 
}
