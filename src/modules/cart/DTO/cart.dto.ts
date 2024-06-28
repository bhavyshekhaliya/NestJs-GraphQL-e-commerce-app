import { Field, ID, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { ArrayMinSize, ArrayUnique, IsArray, IsInt, IsMongoId, IsNotEmpty, Max, Min, ValidateNested } from "class-validator";

@InputType()
class CartItemsDTO {

    @Field(() => ID)
    @IsNotEmpty({ message: "Product ID is required" })
    @IsMongoId({ message: "Invalid product ID format" })
    productId: string

    @Field(() => Int)
    @IsNotEmpty({ message: "Quantity is required" })
    @IsInt({ message: "Quantity must be an integer" })
    @Min(1, { message: "Quantity must be at least 1" })
    @Max(10000, { message: "Quantity must not exceed 10000" })
    quantity: number
}

@InputType()
export class AddProductToCartDTO {

    @Field(() => ID)
    @IsNotEmpty({ message: "User ID is required" })
    @IsMongoId({ message: "Invalid user ID format" })
    userId: string

    @Field(() => [CartItemsDTO])
    @IsNotEmpty({ message: "Cart items are required" })
    @IsArray({ message: "Cart items must be an array" })
    @ArrayMinSize(1, { message: "At least one cart item is required" })
    @ArrayUnique((item: CartItemsDTO) => item.productId, { message: "Duplicate product IDs are not allowed" })
    @ValidateNested({ each: true })
    @Type(() => CartItemsDTO)
    cartItems: CartItemsDTO[]
}

@InputType()
export class UpdateCartDTO {

    @Field(() => [ CartItemsDTO ])
    @IsNotEmpty({ message: "Cart items are required" })
    @IsArray({ message: "Cart items must be an array" })
    @ArrayMinSize(1, { message: "At least one cart item is required" })
    @ArrayUnique((item: CartItemsDTO) => item.productId, { message: "Duplicate product IDs are not allowed" })
    @ValidateNested({ each: true })
    @Type(() => CartItemsDTO)
    cartItems: CartItemsDTO[]
}