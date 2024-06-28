import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true})
@ObjectType()
export class Version {

    @Field(() => String)
    @Prop()
    version: string

    @Field(() => Boolean)
    isAppActive: boolean

    @Field(() => String, { nullable: true })
    appStatus: string

    // @Field(() => String)
    // deviceType: string
}


export type VersionDocument = Version & Document;

export const VersionSchema = SchemaFactory.createForClass(Version);