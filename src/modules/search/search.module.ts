import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchResolver } from "./search.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "../product/schema/product.schema";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Product.name,
                useFactory: () => ProductSchema
            }
        ])
    ],
    providers: [
        SearchService,
        SearchResolver
    ],
    exports: [],
    controllers: []
})
export class SearchModule {}