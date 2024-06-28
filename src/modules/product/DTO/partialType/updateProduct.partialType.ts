import { Field, Float, InputType, Int, PartialType } from "@nestjs/graphql";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUppercase, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { ProductDTO } from "../product.dto";
import { Type } from "class-transformer";

@InputType()
export class UpdateProductSizeDTO {

    @Field(() => String, { nullable: true })
    @IsString({ message: "Size code must be a string" })
    @IsOptional()
    @MinLength(1, { message: "Size code must not be empty" })
    @MaxLength(10, { message: "Size code must not exceed 10 characters" })
    sizeCode?: string

    @Field(() => Float, { nullable: true})
    @IsInt({ message: "Quantity must be an integer" })
    @IsOptional()
    @Min(0, { message: "Quantity must be non-negative" })
    @Max(1000000, { message: "Quantity must not exceed 1,000,000" })
    quantity?: number
}

@InputType()
export class UpdateProductSpecificationDTO {
    
    @Field(() => String, { nullable: true })
    @IsString({ message: "Material must be a string" })
    @IsOptional()
    @MinLength(2, { message: "Material must be at least 2 characters long" })
    @MaxLength(30, { message: "Material must not exceed 30 characters" })
    material?: string

    @Field(() => String, { nullable: true })
    @IsString({ message: "Plating type must be a string" })
    @IsOptional()
    @MinLength(2, { message: "Plating type must be at least 2 characters long" })
    @MaxLength(30, { message: "Plating type must not exceed 30 characters" })
    platingType?: string

    @Field(() => String, { nullable: true })
    @IsString({ message: "Design must be a string" })
    @IsOptional()
    @MinLength(2, { message: "Design must be at least 2 characters long" })
    @MaxLength(30, { message: "Design must not exceed 30 characters" })
    design?: string

    @Field(() =>  [ UpdateProductSizeDTO ] , { nullable: true })
    @IsArray({ message: "Size must be an array" })
    @ValidateNested({ each: true })
    @ArrayMinSize(1, { message: "At least one size must be provided" })
    @Type(() => UpdateProductSizeDTO)
    @IsOptional()
    size?: [ UpdateProductSizeDTO ]

    @Field(() => String,{ nullable: true })
    @IsString({ message: "Color must be a string" })
    @IsOptional()
    @MinLength(2, { message: "Color must be at least 2 characters long" })
    @MaxLength(20, { message: "Color must not exceed 20 characters" })
    color?: string
}


@InputType()
export class UpdateProductDTO extends PartialType(ProductDTO){

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: "Product name must be a string" })
    @IsNotEmpty({ message: "Product name is required" })
    @MinLength(3, { message: "Product name must be at least 3 characters long" })
    @MaxLength(100, { message: "Product name must not exceed 100 characters" })
    productName?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: "Product code must be a string" })
    @IsNotEmpty({ message: "Product code is required" })
    @IsUppercase({ message: "Product code must be in uppercase" })
    @MinLength(3, { message: "Product code must be at least 3 characters long" })
    @MaxLength(20, { message: "Product code must not exceed 20 characters" })
    productCode?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: "Description must be a string" })
    @IsNotEmpty({ message: "Description is required" })
    @MinLength(10, { message: "Description must be at least 10 characters long" })
    @MaxLength(1000, { message: "Description must not exceed 1000 characters" })
    description?: string

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber({}, { message: "Price must be a number" })
    @Min(0, { message: "Price must be non-negative" })
    @Max(1000000, { message: "Price must not exceed 1,000,000" })
    price?: number

    @Field(() => [ String ], { nullable: true })
    @IsOptional()
    @IsArray({ message: "Images must be an array" })
    // @IsUrl({}, { message: "Category image must be a valid URL" })
    @IsString({ each: true, message: "Each image must be a string" })
    @ArrayMinSize(1, { message: "At least one image is required" })
    @ArrayMaxSize(3, { message: "Maximum 3 images are allowed" })
    images?: [ string ]

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt({ message: "MOQ must be an integer" })
    @Min(1, { message: "MOQ must be at least 1" })
    @Max(10000, { message: "MOQ must not exceed 10,000" })
    moq?: number

    @Field(() => UpdateProductSpecificationDTO, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => UpdateProductSpecificationDTO)
    specification?: UpdateProductSpecificationDTO
}
 
          