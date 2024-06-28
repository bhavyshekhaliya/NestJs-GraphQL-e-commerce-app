import { Field, Float, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, MaxLength, Min, MinLength } from "class-validator"

@InputType()
export class AddressDTO {

    @Field(() => String)
    @IsString({ message: "Street and area must be a string" })
    @IsNotEmpty({ message: "Street and area is required" })
    @MinLength(5, { message: "Street and area must be at least 5 characters long" })
    @MaxLength(100, { message: "Street and area must not exceed 100 characters" })
    streetAndArea: string

    @Field(() => String,{ nullable: true })
    @IsString({ message: "Landmark must be a string" })
    @IsOptional()
    @MaxLength(50, { message: "Landmark must not exceed 50 characters" })
    landmark?: string

    @Field(() => String)
    @IsString({ message: "State must be a string" })
    @IsNotEmpty({ message: "State is required" })
    @Length(2, 30, { message: "State must be between 2 and 30 characters long" })
    state: string

    @Field(() => String)
    @IsString({ message: "City must be a string" })
    @IsNotEmpty({ message: "City is required" })
    @Length(2, 30, { message: "City must be between 2 and 30 characters long" })
    city: string

    @Field(() => Float)
    @IsNumber({},{ message: "pinCode must be a number"})
    @IsNotEmpty({ message: "pinCode is required"})
    @Min(100000, { message: "pinCode must be exactly 6 digits" })
    @Max(999999, { message: "pinCode must be exactly 6 digits" })
    pinCode: number

    @Field(() => Float, { nullable: true })
    @IsNumber({}, { message: "Phone number must be a number" })
    @IsNotEmpty({ message: "Phone number is required" })
    @Min(1000000000, { message: "Phone number must be exactly 10 digits" })
    @Max(9999999999, { message: "Phone number must be exactly 10 digits" })
    businessPhoneNumber?: number
}