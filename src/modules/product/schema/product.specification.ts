import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";


@Schema()
@ObjectType()
export class ProductSize {

    @Prop()
    @Field(() => String, { nullable: true })
    sizeCode?: string

    @Prop({ min: 0 })
    @Field(() => Int, { nullable: true })
    quantity?: number
}


@Schema()
@ObjectType()
export class ProductSpecification {

    @Field(() => ID)
    _id: number

    @Prop({ default: null })
    @Field(() => String, { nullable: true })
    material?: string

    @Prop({ default: null })
    @Field(() => String, { nullable: true })
    platingType?: string

    @Prop({ default: null })
    @Field(() => String, { nullable: true })
    design?: string

    @Prop({ default: [] })
    @Field(() => [ ProductSize ], { nullable: true })
    size?: ProductSize[]

    @Prop({ default: null })
    @Field(() => String, { nullable: true })
    color?: string
}   

