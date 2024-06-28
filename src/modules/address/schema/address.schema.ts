import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DateScalar } from "src/common/scalars/date.scalars";

@Schema({ timestamps: true })
@ObjectType()
export class Address {

    @Field(() => ID)
    _id: string

    @Prop({ required: true })
    @Field(() => String)
    streetAndArea: string

    @Prop({ required: false, default: null })
    @Field(() => String, { nullable: true })
    landmark?: string

    @Prop({ required: true })
    @Field(() => String)
    state: string

    @Prop({ required: true })
    @Field(() => String)
    city: string

    @Prop({ required: true, trim: true })
    @Field(() => Float)
    pinCode: number

    @Prop({ default: null })
    @Field(() => Float, { nullable: true })
    businessPhoneNumber?: number

    @Field(() => DateScalar)
    createdAt: Date

    @Field(() => DateScalar)
    updatedAt: Date
}

export type AddressDocument = Address & Document;

export const AddressSchema = SchemaFactory.createForClass(Address);