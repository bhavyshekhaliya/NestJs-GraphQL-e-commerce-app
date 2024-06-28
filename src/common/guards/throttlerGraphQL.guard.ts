import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ThrottlerGuard } from "@nestjs/throttler";

/// Throttler guard
@Injectable()
export class ThrottlerGraphQLGruard extends ThrottlerGuard {
    protected getRequestResponse(context: ExecutionContext): { req: Record<string, any>; res: Record<string, any>; } {
        const gqlContext = GqlExecutionContext.create(context).getContext();
        
        return {
            req: gqlContext.req,
            res: gqlContext.req.res
        }
    }
}