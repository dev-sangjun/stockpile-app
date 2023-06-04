export class EntityNotFoundError extends Error implements Error {
  status: number = 404;
  message: string = "Cannot find the entity";
}

export class UnauthorizedError extends Error implements Error {
  status: number = 401;
  message: string = "Unauthorized";
}

export class ResourceNotFoundError extends Error implements Error {
  status: number = 404;
  message: string = "Resource not found";
}

export class DuplicateEntityError extends Error implements Error {
  status: number = 409;
  message: string = "Entity already exists";
}

export class InternalServerError extends Error implements Error {
  status: number = 502;
  message: string = "Internal Server Error";
}

export class BadRequestError extends Error implements Error {
  status: number = 400;
  message: string = "Bad Request";
}
