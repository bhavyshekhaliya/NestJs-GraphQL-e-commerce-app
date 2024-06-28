import { Field, Float, InputType } from "@nestjs/graphql";
import { UserBusinessDetailDTO } from "./user.businessDetail.dto";
import { UserDeviceDetailDTO } from "./user.deviceDetail.dto";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches, Max, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class RegisterUserDTO {

    @Field(() => String)
    @IsString({ message: "Username must be a string" })
    @IsNotEmpty({ message: "Username is required" })
    @Length(3, 20, { message: "Username must be between 3 and 20 characters" })
    @Matches(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
    userName: string

    @Field(() => String, { nullable: true })
    @IsString({ message: "Email must be a string" })
    @IsEmail({}, { message: "Please enter a valid email address" })
    @IsNotEmpty({ message: "Email is required" })
    email?: string

    @Field(() => Float)
    @IsNumber({}, { message: "Phone number must be a number" })
    @IsNotEmpty({ message: "Phone number is required" })
    @Min(1000000000, { message: "Phone number must be exactly 10 digits" })
    @Max(9999999999, { message: "Phone number must be exactly 10 digits" })
    phoneNumber: number
  
    @Field()
    @ValidateNested()
    @Type(() => UserBusinessDetailDTO)
    @IsNotEmpty({ message: "Business details are required" })
    businessDetail: UserBusinessDetailDTO
 
    @Field()
    @ValidateNested()
    @Type(() => UserDeviceDetailDTO)
    @IsNotEmpty({ message: "Device details are required" })
    deviceDetail: UserDeviceDetailDTO
}