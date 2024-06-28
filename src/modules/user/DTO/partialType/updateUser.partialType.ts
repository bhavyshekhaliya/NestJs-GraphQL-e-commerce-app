import { Field, InputType, PartialType } from "@nestjs/graphql"
import { RegisterUserDTO } from "../registerUser.dto"
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator"

@InputType()
export class UpdateUserDTO extends PartialType(RegisterUserDTO) {

    @Field(() => String,{ nullable: true })
    @IsString({ message: "Username must be a string" })
    @IsOptional()
    @IsNotEmpty({ message: "Username is required" })
    @Length(3, 20, { message: "Username must be between 3 and 20 characters" })
    @Matches(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
    userName?: string

    @Field(() => String,{ nullable:true })
    @IsOptional()
    @IsString({ message: "Email must be a string" })
    @IsEmail({}, { message: "Please enter a valid email address" })
    @IsNotEmpty({ message: "Email is required" })
    email?: string
}