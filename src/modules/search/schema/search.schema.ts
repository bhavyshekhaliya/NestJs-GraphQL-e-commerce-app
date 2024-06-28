import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SearchResult {

    @Field(() => ID)
    _id: string

    @Field(() => String)
    productName: string
}