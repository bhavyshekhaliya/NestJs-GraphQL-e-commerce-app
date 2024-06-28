import { InputType , Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Matches } from "class-validator";

@InputType()
export class AppVersionDTO {

    // @Field(() => String)
    // @IsString({ message: "Device type must be a string" })
    // @IsNotEmpty({ message: "Device type is required" })
    // @Matches(/^(ANDROID|IOS)$/i, { message: "Device type must be either 'android' or 'ios'" })
    // deviceType: string;  

    @Field(() => String)
    @IsString({ message: "Version must be a string" })
    @IsNotEmpty({ message: "Version is required" })
    @Matches(/^(\d+\.){2}\d+$/, { message: "Version must be in the format x.y.z (e.g., 1.0.0)" })
    version: string
}
