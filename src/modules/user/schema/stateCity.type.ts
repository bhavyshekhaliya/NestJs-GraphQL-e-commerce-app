import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StateCity {

    @Field(() => String)
    countryCode: string

    @Field(() => String)
    stateCode: string

    @Field(() => String)
    name: string
} 