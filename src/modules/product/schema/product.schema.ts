import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DateScalar } from "src/common/scalars/date.scalars";
import { ProductSpecification } from "./product.specification";
import mongoose from "mongoose";
import { Category } from "src/modules/category/schema/category.schema";

@Schema({ timestamps : true })
@ObjectType()
export class Product {

    @Field(() => ID)
    _id: string

    @Prop({ unique: true , required: [true,"Product Name Must be Uniue" ] })
    @Field(() => String)
    productName: string

    @Prop({ uppercase: true, trim: true })
    @Field(() => String)
    productCode: string

    @Prop()
    @Field(() => String)
    description: string

    @Prop({ trim: true, required: true, min: 0 })
    @Field(() => Float)
    price: number

    @Prop({ required: true })
    @Field(() => [String])
    images: [string]

    @Prop({type: mongoose.Schema.Types.ObjectId , ref: "Category"})
    @Field(() => Category )
    categoryId: string

    @Prop({ required: true , trim: true, min: 0 })
    @Field(() => Int)
    moq: number

    @Prop({ type: ProductSpecification })
    @Field({ nullable: true })
    specification?: ProductSpecification

    @Field(() => Boolean)
    isProductCarted: boolean

    @Field(() => DateScalar)
    createdAt: Date

    @Field(() => DateScalar)
    updatedAt: Date
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);

/// Indexing :
/// Text indexes in MongoDB allow for efficient searching of text fields within documents.
ProductSchema.index({ productName: 'text'})