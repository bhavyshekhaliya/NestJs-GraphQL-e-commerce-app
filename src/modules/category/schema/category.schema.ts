import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { DateScalar } from "src/common/scalars/date.scalars";
import { Product } from "src/modules/product/schema/product.schema";

@Schema({ timestamps: true })
@ObjectType()
export class Category {

    @Field(() => ID)
    _id: string

    @Prop({ required: true , unique: true })
    @Field(() => String)
    categoryName: string

    @Prop({ required: true })
    @Field(() => String)
    categoryImage: string

    @Prop({ type: [ mongoose.Schema.Types.ObjectId ], default: [], ref: 'Product'})
    @Field(() => [ Product ])
    productIds: [ Product ]

    @Field(() => DateScalar)
    createdAt: Date

    @Field(() => DateScalar)
    updatedAt: Date
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
