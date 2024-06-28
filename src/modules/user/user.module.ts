import { Module } from "@nestjs/common";
import { User, UserSchema } from "./schema/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { UserResolver } from "./user.resolver";
import { Address, AddressSchema } from "../address/schema/address.schema";
import { Cart, CartSchema } from "../cart/schema/cart.schema";

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
            },
            {
                name: Cart.name,
                useFactory: () => CartSchema,
            }
        ]),
    ],
    providers: [
        UserService,
        UserResolver,
        JwtService,
    ],
    exports: [
        UserService,
    ],
    controllers: []
})
export class UserModule {}