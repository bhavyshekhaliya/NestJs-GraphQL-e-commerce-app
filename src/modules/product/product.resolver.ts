import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { Product } from "./schema/product.schema";
import { CommonSuccessResponce, PaginationDTO } from "src/common/common";
import { ProductDTO } from "./DTO/product.dto";
import { Category } from "../category/schema/category.schema";
import { UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { UpdateProductDTO } from "./DTO/partialType/updateProduct.partialType";
import { SkipThrottle } from "@nestjs/throttler";
import { ProductSpecification } from "./schema/product.specification";

@Resolver(() => Product)
export class ProductResolver {
    constructor(
        private productService: ProductService,
    ) {}

    /// Get all products
    @Query(() => [ Product ])
    @UseGuards(AccessTokenGuard)
    async getAllProducts(@Args() paginationDTO: PaginationDTO): Promise<Product[]> {
        return this.productService.getAllProducts(paginationDTO);
    }

    /// count products document
    @Query(() => Number)
    @UseGuards(AccessTokenGuard)
    async countProducts(): Promise<number> {
        return this.productService.countProducts();
    }

    /// Get product by id
    @Query(() => Product)
    @UseGuards(AccessTokenGuard)
    async getProductById(@Args('productId') productId: string): Promise<Product> {
        return this.productService.getProductById(productId);
    }

    /// Get products by category
    @Query(() => Category)
    @UseGuards(AccessTokenGuard)
    @SkipThrottle()
    async getProductsByCategory(@Args('categoryId') categoryId: string): Promise<Category> {
        return this.productService.getProductsByCategory(categoryId);
    }

    /// Add product
    @Mutation(() => CommonSuccessResponce)
    @UseGuards(AccessTokenGuard)
    @SkipThrottle()
    async addProduct(
        @Args('categoryId') categoryId: string,
        @Args('addProductDTO') productDTO: ProductDTO
    ): Promise<CommonSuccessResponce> {
        const addProductResponse = await this.productService.addProduct(categoryId,productDTO);
        return {
            code: addProductResponse.code,
            message: addProductResponse.message
        }
    }

    /// Update product 
    @Mutation(() => CommonSuccessResponce)
    @UseGuards(AccessTokenGuard)
    @SkipThrottle()
    async updateProduct(
        @Args('productId') productId: string,
        @Args('updateProductDTO') updateProductDTO: UpdateProductDTO
    ): Promise<CommonSuccessResponce> {
        const updatedProductResponse = await this.productService.updateProduct(productId,updateProductDTO);
        return {
            code: updatedProductResponse.code,
            message: updatedProductResponse.message
        }
    }

    /// Delete product
    @Mutation(() => CommonSuccessResponce)
    @UseGuards(AccessTokenGuard)
    @SkipThrottle()
    async deleteProduct(@Args('productId') productId: string): Promise<CommonSuccessResponce> {
        const deletedProductResponse = await this.productService.deleteProduct(productId);
        return {
            code: deletedProductResponse.code,
            message: deletedProductResponse.message
        }
    }

    /// Resolve field for isProductCarted
    @ResolveField('isProductCarted',() => Boolean)
    async isProductCarted(
        @Parent() product: Product,
        @Args('userId') userId: string
    ): Promise<boolean> {
        return this.productService.isProductCarted(userId,product);
    } 

    /// Resolve field for isOutOfStock
    @ResolveField('specification', () => ProductSpecification)
    async specification(@Parent() product: Product): Promise<ProductSpecification> {
        if (!product.specification) {
            return null;
        }

        const updatedSizes = product.specification.size.map(size => ({
            ...size,
            isOutOfStock: (size.quantity ?? 0) >= product.moq
        }));

        return {
            ...product.specification,
            size: updatedSizes
        };
    }
}