import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/modules/product/schema/product.schema";
import { User } from "src/modules/user/schema/user.schema";

@ObjectType()
export class CartItems {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    @Field(() => Product)
    productId: string

    @Prop({ type: Number, required: true, min: 1 })
    @Field(() => Int)
    quantity: number 
}

@Schema({ timestamps: true })
@ObjectType()
export class Cart {

    @Field(() => ID)
    _id: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    @Field(() => User)
    userId: User

    @Prop({ type: [ CartItems ], default: [] })
    @Field(() => [ CartItems ])
    cartItems: CartItems[]
}

export type CartDocument = Cart & Document;

export const CartSchema = SchemaFactory.createForClass(Cart); 