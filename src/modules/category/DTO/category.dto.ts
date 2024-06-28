import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class CategoryDTO {

    @Field(() => String)
    @IsString({ message: "Category name must be a string" })
    @IsNotEmpty({ message: "Category name is required" })
    @MinLength(2, { message: "Category name must be at least 2 characters long" })
    @MaxLength(30, { message: "Category name must not exceed 30 characters" })
    @Matches(/^[a-zA-Z0-9\s&-]+$/, {
        message: "Category name can only contain letters, numbers, spaces, ampersands, and hyphens"
    })
    categoryName: string

    @Field(() => String)
    @IsString({ message: "Category image URL must be a string" })
    @IsNotEmpty({ message: "Category image URL is required" })
    // @IsUrl({}, { message: "Category image must be a valid URL" })
    @MaxLength(2000, { message: "Category image URL must not exceed 2000 characters" })
    categoryImage: string
}