import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cart, CartDocument, CartItems } from "./schema/cart.schema";
import { Model } from "mongoose";
import { User } from "../user/schema/user.schema";
import { UserModule } from "../user/user.module";
import { AddProductToCartDTO, UpdateCartDTO } from "./DTO/cart.dto";
import { CommonSuccessResponce } from "src/common/common";
import { Http400Exception } from "src/common/exception/custom.exception";

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
        @InjectModel(User.name) private userModel: Model<UserModule>,
    ) {} 

    /// Get cart by userId serive
    async getCartByUserId(userId: string): Promise<Cart> {
        try {
            const cartData = (await this.cartModel.findOne({ userId: userId }).populate({
                path: 'cartItems.productId',
                model: 'Product'
            }).lean().exec()) as Cart;

            if(!cartData) {
                const cratedCartData = await this.cartModel.create({ userId: userId });
                await this.userModel.findByIdAndUpdate(userId, { $set: { cartId: cratedCartData._id } });

                return cratedCartData;
            }
   
            return cartData;
        } catch (error) {
            throw new Http400Exception('Unable to retrieve cart information.');
        }
    }

    /// Add product to cart service
    async addProductInCart(
        userId: string,
        cartItemsDTO: AddProductToCartDTO['cartItems']
    ): Promise<CommonSuccessResponce> {
        try {
            const cart = await this.cartModel.findOne({ userId: userId }).exec();
            
            if(!cart) { 
                const newCart = await this.cartModel.create({ userId: userId, cartItemsDTO});
                
                await this.userModel.findByIdAndUpdate(userId, { $set: { cartId: newCart._id } });
                
                const updatedCartItemss = this.mergeCartItems(newCart.cartItems,cartItemsDTO);

                newCart.cartItems = updatedCartItemss;

                await newCart.save();
        
                return {
                    code: 200,
                    message: "Product added to cart successfully"
                }
            } 
            
            const updatedCartItems = this.mergeCartItems(cart.cartItems,cartItemsDTO);
            
            cart.cartItems = updatedCartItems;

            await cart.save();
    
            return {
                code: 200,
                message: "Product added to cart successfully"
            }
        } catch (error) {
            throw new Http400Exception('Failed to add product to cart.')
        }
    }

    /// Update item quantity cart service
    async updateItemQuantityInCart(
        userId: string,
        cartItemsDTO: UpdateCartDTO['cartItems'],
    ): Promise<CommonSuccessResponce> {
        try {
            const cart = await this.cartModel.findOne({ userId: userId }).exec();

            const updatedCartItems = this.findAndUpdateCartService(cart.cartItems,cartItemsDTO);

            cart.cartItems = updatedCartItems;

            await cart.save();
    
            return {
                code: 200,
                message: "Quantity updated successfully in cart"
            }
        } catch (error) {
            throw new Http400Exception('Failed to update product quantity in cart.')
        }
    }

    /// Find and filter cart and update item service  
    private findAndUpdateCartService(
        existingCartItems: CartItems[],
        cartItemsDTO: UpdateCartDTO['cartItems'],
      ): CartItems[] {
        return existingCartItems.map((item) => {
            
          const foundItem = cartItemsDTO.find(
            (dtoItem) => dtoItem.productId === item.productId.toString(),
          );
            
          if (foundItem) {
            return {
              ...item,
              quantity: foundItem.quantity,
            };
          }
          return item;
        });
      }

    /// Merge old cartItems with existing cartItems service
    private mergeCartItems(
        existingCartItems: CartItems[],
        cartItemsDTO: (AddProductToCartDTO | UpdateCartDTO)['cartItems']
    ): CartItems[] {

        const updatedCartItems = [...existingCartItems];

        for(const { productId, quantity } of cartItemsDTO) {
            const existingItems = updatedCartItems.find((item) => item.productId === productId)

            if(existingItems) {
                existingItems.quantity += quantity;
            } else {
                updatedCartItems.push({
                    productId,
                    quantity                    
                });
            }
        }
        return updatedCartItems
    }

    /// Remove product in cart service
    async removeProductFromCart(
        userId: string,
        productId: string
    ): Promise<CommonSuccessResponce> {
        try {
            const cart = await this.cartModel.findOne({ userId: userId }).exec();
     
            cart.cartItems = cart.cartItems.filter((item) => item.productId !== productId);
    
            await cart.save();
    
            return {
                code: 200,
                message: "Product removed from cart successfully"
            }
        } catch (error) {
            throw new Http400Exception('Failed to remove product from cart.')
        }
    }
}
