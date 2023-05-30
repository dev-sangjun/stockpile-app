export class EntityNotFoundError extends Error implements Error {
  status: number = 404;
  message: string = "Cannot find the entity";
}

export class UnauthorizedError extends Error implements Error {
  status: number = 401;
  message: string = "Unauthorized";
}
