import { Module } from "@nestjs/common";
import { RefreshTokenStrategy } from "../../common/strategies/refreshToken.strategy";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AccessTokenStrategy } from "../../common/strategies/accessToken.strategy";
import { User, UserSchema } from "../user/schema/user.schema";
import { AuthResolver } from "./auth.resolver";
import { UserModule } from "../user/user.module";
import { Address, AddressSchema } from "../address/schema/address.schema";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => UserSchema,
            },
            {
                name: Address.name,
                useFactory: () => AddressSchema, 
            }
        ]),
        UserModule,
    ],
    providers: [
        JwtService,
        AuthService,
        AuthResolver,
        AccessTokenStrategy,
        RefreshTokenStrategy, 
    ],
    exports: []
})
export class AuthModule {}