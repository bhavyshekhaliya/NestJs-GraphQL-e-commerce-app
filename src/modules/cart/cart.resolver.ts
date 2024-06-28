import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CartService } from "./cart.service";
import { Cart } from "./schema/cart.schema";
import { AddProductToCartDTO, UpdateCartDTO } from "./DTO/cart.dto";
import { CommonSuccessResponce } from "src/common/common";
import { UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";

@Resolver(() => Cart)
export class CartResolver {
    constructor(
        private cartService: CartService,
    ) {} 

    /// Get cart by usesId
    @Query(() => Cart)
    @UseGuards(AccessTokenGuard)
    async getCartByUserId(@Args('userId') userId: string): Promise<Cart> {
        return this.cartService.getCartByUserId(userId);
    }

    /// Add product in cart 
    @Mutation(() => CommonSuccessResponce)
    @UseGuards(AccessTokenGuard)
    async addProductToCart(
        @Args('cartItems') addProductToCart: AddProductToCartDTO   
    ): Promise<CommonSuccessResponce> {
        return this.cartService.addProductInCart(addProductToCart.userId,addProductToCart.cartItems);
    }

    /// Update product quantity in cart
    @Mutation(() => CommonSuccessResponce)
    @UseGuards(AccessTokenGuard)
    async updateItemQuantityInCart(
        @Args('userId') userId: string,
        @Args('updateCartDTO') updateCartDTO: UpdateCartDTO
    ): Promise<CommonSuccessResponce> {
        return this.cartService.updateItemQuantityInCart(userId,updateCartDTO.cartItems);
    }

    /// Remove product in cart
    @Mutation(() => CommonSuccessResponce)
    @UseGuards(AccessTokenGuard)
    async removeProductFromCart(
        @Args('userId') userId: string,
        @Args('productId') productId: string
    ): Promise<CommonSuccessResponce> {
        return this.cartService.removeProductFromCart(userId, productId);
    }
}