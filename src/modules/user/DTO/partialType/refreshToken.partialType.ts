import { Field, InputType, PartialType } from "@nestjs/graphql";
import { RegisterUserDTO } from "../registerUser.dto";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UpdateRefreshTokenDTO extends PartialType(RegisterUserDTO) {

    @Field() 
    @IsString({ message: "Refresh token must be a string" })
    @IsNotEmpty({ message: "Refresh token is required" })
    refreshToken: string;
}