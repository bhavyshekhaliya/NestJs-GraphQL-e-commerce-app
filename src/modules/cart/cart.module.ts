import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartResolver } from "./cart.resolver";
import { Cart, CartSchema } from "./schema/cart.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/schema/user.schema";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Cart.name,
                useFactory: () => CartSchema,
            },
            {
                name: User.name,
                useFactory: () => UserSchema,
            }
        ]),
    ],
    providers: [
        CartService,
        CartResolver
    ],
    controllers: [],
    exports: []
})
export class CartModule {}