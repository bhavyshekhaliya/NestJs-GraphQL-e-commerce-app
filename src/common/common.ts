import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { Max, Min } from "class-validator";

/// for CommonSuccessResponce
@ObjectType()
export class CommonSuccessResponce {
    
    @Field(() => Int)
    code: number

    @Field(() => String)
    message: string
}

/// for pagination
@ArgsType()
export class PaginationDTO {

    @Field(() => Int)
    @Min(0)
    skip: 0

    @Field(() => Int)
    @Min(0)
    @Max(50)
    take = 25
}

// @ObjectType()
// export class CommonResponse<T> {
    
//     data: T
// }