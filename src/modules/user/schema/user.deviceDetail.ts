import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
@ObjectType()
export class UserDeviceDetail {

    @Field(() => ID)
    _id: number

    @Prop({ unique: true , required: true })
    @Field(() => String)
    deviceToken: string

    @Prop({ enum: ["ANDROID","IOS"] , required: true , trim: true})
    @Field(() => String)
    deviceType : string
} 