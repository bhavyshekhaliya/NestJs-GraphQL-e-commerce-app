import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductResolver } from "./product.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schema/product.schema";
import { Category, CategorySchema } from "../category/schema/category.schema";
import { Cart, CartSchema } from "../cart/schema/cart.schema";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Product.name,
                useFactory: () => ProductSchema
            },
            {
                name: Category.name,
                useFactory: () => CategorySchema
            },
            {
                name: Cart.name,
                useFactory: () => CartSchema,
            }
        ])
    ],
    providers: [
        ProductService,
        ProductResolver
    ],
    exports: [],
    controllers: []
})
export class ProductModule {}