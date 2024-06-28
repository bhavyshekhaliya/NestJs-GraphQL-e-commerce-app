import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "../product/schema/product.schema";
import { Model } from "mongoose";
import { ProductModule } from "../product/product.module";
import { Http400Exception } from "src/common/exception/custom.exception";

@Injectable()
export class SearchService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductModule>
    ) {}

    /// search product service
    async searchProduct(searchInput: string, limit: number = 10,skip: number = 0): Promise<Product[]> {
        try {
            const regex = new RegExp(searchInput,'i')
            const searchProduct = (await this.productModel.find(
                    { productName: { $regex: regex } },
                    null,
                    {
                        limit: limit,
                        skip: skip
                    }
                ).lean().exec()
            ) as Product[];

            return searchProduct;
        } catch (error) {
            throw new Http400Exception("Failed to search");
        }
    }
}