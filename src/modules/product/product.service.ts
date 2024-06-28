import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./schema/product.schema";
import { Model } from "mongoose";
import { ProductModule } from "./product.module";
import { Http400Exception } from "src/common/exception/custom.exception";
import { ProductDTO } from "./DTO/product.dto";
import { CategoryModule } from "../category/category.module";
import { Category } from "../category/schema/category.schema";
import { CommonSuccessResponce, PaginationDTO } from "src/common/common";
import { UpdateProductDTO } from "./DTO/partialType/updateProduct.partialType";
import { Cart } from "../cart/schema/cart.schema";
import { CartModule } from "../cart/cart.module";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductModule>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryModule>,
        @InjectModel(Cart.name) private cartModel: Model<CartModule>,
    ) {}

    /// Get all products service
    async getAllProducts(paginationDTO: PaginationDTO = { skip: 0, take: 5 }): Promise<Product[]> {
        try {
            const products: Product[] = (await this.productModel.find(
                null, null, {
                    limit: paginationDTO.take,
                    skip: paginationDTO.skip
                }
            ).populate('categoryId').lean().exec()) as Product[];

            return products;
        } catch (error) {
            throw new Http400Exception("Failed to retrieve products.")
        }
    }

    /// count products document service
    async countProducts() {
        try {
            const numberOfProducts: number = await this.productModel.countDocuments().lean().exec();
            return numberOfProducts;
        } catch (error) {
            throw new Http400Exception('Failed to count products.')
        }
    }

    /// Get product by id service
    async getProductById(productId: string): Promise<Product> {
        try {
            const product: Product = (await this.productModel.findById(productId).populate('categoryId').lean()) as Product;
            return product;
        } catch (error) {
            throw new Http400Exception("Failed to retrieve product.")
        }
    }

    /// Get products by category service
    async getProductsByCategory(categoryId: string): Promise<Category> {
        try {
            const productsByCategory: Category = (await this.categoryModel.findById(categoryId).populate('productIds').lean().exec()) as Category;
            return productsByCategory;
        } catch (error) {
            throw new Http400Exception("Failed to retrieve category.");
        }
    }

    /// Add product service
    async addProduct(categoryId: string, productDTO: ProductDTO): Promise<CommonSuccessResponce> {
        try {
            const category = await this.categoryModel.findById(categoryId).lean().exec();
    
            const product = await this.productModel.create({ ...productDTO, categoryId: category._id });
           
            await this.categoryModel.findByIdAndUpdate(categoryId, { $push: { productIds: product._id } }, { new: true }).lean().exec();
    
            return {
                code: 200,
                message: "Product added successfully"
            }
        } catch (error) {
            throw new Http400Exception("Failed to add product.")
        }
    }

    /// Update producut service
    async updateProduct(productId: string, updateProductDTO: UpdateProductDTO): Promise<CommonSuccessResponce> {
        try {
            await this.productModel.findByIdAndUpdate(productId, updateProductDTO, { new: true }).lean().exec();
            return {
                code: 200,
                message: "Product updated successfully"
            }
        } catch (error) {
            throw new Http400Exception('Failed to update product.')
        }
    }

    /// Delete product service
    async deleteProduct(productId: string): Promise<CommonSuccessResponce> {
        try {
            await this.productModel.findByIdAndDelete(productId).lean().exec();
            return {
                code: 200,
                message: "Product deleted successfully"
            }
        } catch (error) {
            throw new Http400Exception("Failed to delete product.")
        }
    }


    /// Resolve field for the isProductCarted service
    async isProductCarted(userId: string, product: Product) {
        try {
            const cart: Cart = await this.cartModel.findOne({ userId: userId});
            if(!cart) {
                return false;
            }
    
            return cart.cartItems.some(item => item.productId.toString() === product._id.toString())
        } catch (error) {
            throw new Http400Exception("Failed to check cart status.");
        }
    }
}