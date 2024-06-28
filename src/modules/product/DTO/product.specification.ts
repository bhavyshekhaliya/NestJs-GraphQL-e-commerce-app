import { Field, Float, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";

@InputType()
export class ProductSizeDTO {

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
export class ProductSpecificationDTO {
    
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

    @Field(() =>  [ ProductSizeDTO ] , { nullable: true })
    @IsArray({ message: "Size must be an array" })
    @ValidateNested({ each: true })
    @ArrayMinSize(1, { message: "At least one size must be provided" })
    @Type(() => ProductSizeDTO)
    @IsOptional()
    size?: [ ProductSizeDTO ]

    @Field(() => String,{ nullable: true })
    @IsString({ message: "Color must be a string" })
    @IsOptional()
    @MinLength(2, { message: "Color must be at least 2 characters long" })
    @MaxLength(20, { message: "Color must not exceed 20 characters" })
    color?: string
}
