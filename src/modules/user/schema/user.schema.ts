import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserDeviceDetail } from "./user.deviceDetail";
import { UserBusinessDetail } from "./user.businessDetail";
import { DateScalar } from "src/common/scalars/date.scalars";
import mongoose from "mongoose";
import { Cart } from "src/modules/cart/schema/cart.schema";

@Schema({timestamps: true})
@ObjectType()
export class User {

    @Field(() => ID)
    _id: string

    @Prop({ required: true })
    @Field(() => String)
    userName: string

    @Prop({ unique: true , trim: true })
    @Field(() => String , { nullable: true })
    email?: string

    @Prop({ trim: true , enum: ["BUYER","ADMIN"], default: "BUYER"})
    @Field(() => String)
    userType: string

    @Prop({ unique: true , required: true , trim: true })
    @Field(() => Float)
    phoneNumber: number

    @Prop({ type: UserDeviceDetail })
    @Field(() => UserDeviceDetail)
    deviceDetail: UserDeviceDetail

    @Prop({ type: UserBusinessDetail })
    @Field(() => UserBusinessDetail)
    businessDetail: UserBusinessDetail

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Cart" })
    @Field(() => Cart)
    cartId: Cart

    @Field(() => String)
    accessToken : string

    @Prop({ default: null , unique: true })
    @Field(() => String, { nullable: true })
    refreshToken? : string

    @Field(() => DateScalar)
    createdAt: Date

    @Field(() => DateScalar)
    updatedAt: Date
}
 
export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);