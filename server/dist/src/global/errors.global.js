"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.InternalServerError = exports.DuplicateEntityError = exports.ResourceNotFoundError = exports.UnauthorizedError = exports.EntityNotFoundError = void 0;
class EntityNotFoundError extends Error {
    constructor() {
        super(...arguments);
        this.status = 404;
        this.message = "Cannot find the entity";
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
class UnauthorizedError extends Error {
    constructor() {
        super(...arguments);
        this.status = 401;
        this.message = "Unauthorized";
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ResourceNotFoundError extends Error {
    constructor() {
        super(...arguments);
        this.status = 404;
        this.message = "Resource not found";
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
class DuplicateEntityError extends Error {
    constructor() {
        super(...arguments);
        this.status = 409;
        this.message = "Entity already exists";
    }
}
exports.DuplicateEntityError = DuplicateEntityError;
class InternalServerError extends Error {
    constructor() {
        super(...arguments);
        this.status = 502;
        this.message = "Internal Server Error";
    }
}
exports.InternalServerError = InternalServerError;
class BadRequestError extends Error {
    constructor() {
        super(...arguments);
        this.status = 400;
        this.message = "Bad Request";
    }
}
exports.BadRequestError = BadRequestError;
