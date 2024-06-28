import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { ProductSpecificationDTO } from "./product.specification";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsNumber, IsString, IsUppercase, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class ProductDTO {

    @Field(() => String)
    @IsString({ message: "Product name must be a string" })
    @IsNotEmpty({ message: "Product name is required" })
    @MinLength(3, { message: "Product name must be at least 3 characters long" })
    @MaxLength(50, { message: "Product name must not exceed 50 characters" })
    productName: string

    @Field(() => String)
    @IsString({ message: "Product code must be a string" })
    @IsNotEmpty({ message: "Product code is required" })
    @IsUppercase({ message: "Product code must be in uppercase" })
    @MinLength(3, { message: "Product code must be at least 3 characters long" })
    @MaxLength(20, { message: "Product code must not exceed 20 characters" })
    productCode: string

    @Field(() => String)
    @IsString({ message: "Description must be a string" })
    @IsNotEmpty({ message: "Description is required" })
    @MinLength(10, { message: "Description must be at least 10 characters long" })
    @MaxLength(150, { message: "Description must not exceed 150 characters" })
    description: string

    @Field(() => Float)
    @IsNumber({}, { message: "Price must be a number" })
    @Min(0, { message: "Price must be non-negative" })
    @Max(1000000, { message: "Price must not exceed 1,000,000" })
    price: number

    @Field(() => [ String ])
    @IsArray({ message: "Images must be an array" })
    // @IsUrl({}, { message: "Category image must be a valid URL" })
    @IsString({ each: true, message: "Each image must be a string" })
    @ArrayMinSize(1, { message: "At least one image is required" })
    @ArrayMaxSize(3, { message: "Maximum 3 images are allowed" })
    images: [ string ]

    @Field(() => Int)
    @IsInt({ message: "MOQ must be an integer" })
    @Min(1, { message: "MOQ must be at least 1" })
    @Max(10000, { message: "MOQ must not exceed 10,000" })
    moq: number

    @Field(() => ProductSpecificationDTO, { nullable: true })
    @ValidateNested()
    @Type(() => ProductSpecificationDTO)
    specification?: ProductSpecificationDTO
}
 