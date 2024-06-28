import { GraphQLError } from 'graphql';

/// Invalid syntax, validation Error 
/// occupied due to client error
/// invalid query syntax, invalid arguments, or invalid mutations.
export class Http400Exception extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 400,
        timestamp: new Date().toISOString()
      }
    });
  }
}

/// Unathorixed Exception
export class Http401Exception extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 401,
        timestamp: new Date().toISOString()
      }
    });
  }
}

/// 403 Forbidden status might correspond to authorization checks failing, such as trying to access a restricted field or perform an action that the user does not have permission to perform.
export class Http403Exception extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 403,
        timestamp: new Date().toISOString()
      }
    });
  }
}

/// Not Found Exception
/// The server can not find the requested resource.
export class Http404Exception extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 404,
        timestamp: new Date().toISOString()
      }
    });
  }
}

/// The server has encountered a situation it doesn't know how to handle.
/// Used for unexpected server errors.
export class Http500Exception extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 500,
        timestamp: new Date().toISOString()
      }
    });
  }
}