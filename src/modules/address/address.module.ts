import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressResolver } from "./address.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Address, AddressSchema } from "./schema/address.schema";
import { User, UserSchema } from "../user/schema/user.schema";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Address.name,
                useFactory: () => AddressSchema,
            },
            {
                name: User.name,
                useFactory: () => UserSchema,
            }
        ]),
    ],
    providers: [
        AddressService,
        AddressResolver
    ],
    exports: [],
    controllers: []
})
export class AddressModule {}