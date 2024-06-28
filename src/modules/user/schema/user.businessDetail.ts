import { Field, ObjectType } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Address } from "src/modules/address/schema/address.schema";

@ObjectType()
export class UserBusinessDetail {

    @Prop() 
    @Field(() => String, { nullable: true })
    shopName?: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }], default: [] })
    @Field(() => [ Address ])
    addressIds: [ Address ]
}


  