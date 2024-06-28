import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class UserBusinessDetailDTO {

    @Field(() => String, { nullable: true })
    @IsString({ message: "Shop name must be a string" })
    @IsNotEmpty({ message: "Shop name is required" })
    @MinLength(2, { message: "Shop name must be at least 2 characters long" })
    @MaxLength(30, { message: "Shop name must not exceed 30 characters" })
    @Matches(/^[a-zA-Z0-9\s&'-]+$/, {
        message: "Shop name can only contain letters, numbers, spaces, and the characters &, ', -"
    })
    shopName?:string
}