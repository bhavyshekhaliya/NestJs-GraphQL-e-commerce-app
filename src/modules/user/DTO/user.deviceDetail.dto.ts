
import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Matches } from "class-validator";

@InputType()
export class UserDeviceDetailDTO {

    @Field(() => String)
    @IsString({ message: "Device token must be a string" })
    @IsNotEmpty({ message: "Device token is required" })
    deviceToken: string
    
    @Field(() => String)
    @IsString({ message: "Device type must be a string" })
    @IsNotEmpty({ message: "Device type is required" })
    @Matches(/^(ANDROID|IOS)$/i, { message: "Device type must be either 'android' or 'ios'" })
    deviceType: string
}
