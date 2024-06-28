import { ArgumentsHost, Catch, HttpException, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

/// Custorm Graphql and Http exception filter
@Catch(HttpException, GraphQLError)
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | GraphQLError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    const request = ctx.req;

    let status,message;
    
    if(exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      message = (typeof response === 'string') ? response : (response as any).message || exception.message;

    } else if(exception instanceof GraphQLError) {
      status = exception.extensions?.code || 500;
      message = exception.message;

    } else {
      status = 500;
      message = 'Internal server error'
    }

    if(status == 401) {
      message = "Unauthorized"; 
    }

    if(status == 429) {
      message = "Too Many Requests"; 
    }

    // Return a formatted error response
    return new GraphQLError(message, {
      extensions: {
        code: status,
        timestamp: new Date().toISOString(),
        path: gqlHost.getInfo().fieldName || request.originalUrl || request.url,
      },
    });
  }
}
