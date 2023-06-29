"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DBClient_1 = __importDefault(require("../../prisma/DBClient"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_global_1 = require("../global/errors.global");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const createUser = (authUserSignUpRequestDto) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, username, password } = authUserSignUpRequestDto;
    const salt = yield bcryptjs_1.default.genSalt();
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    try {
        const user = yield DBClient_1.default.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                favoriteStocks: [],
            },
        });
        return {
            id: user.id,
        };
    }
    catch (e) {
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            e.code === "P2002") {
            // Unique constraints error will only return the first violated unique field
            if (((_a = e.meta) === null || _a === void 0 ? void 0 : _a.target) && Array.isArray((_b = e.meta) === null || _b === void 0 ? void 0 : _b.target)) {
                // no need to check for username if the error is caused by username field
                if (e.meta.target.includes("username")) {
                    throw e;
                }
                // check if username is already in use & add the field to e.meta.target
                const user = yield DBClient_1.default.user.findFirst({
                    where: {
                        username,
                    },
                });
                if (user) {
                    e.meta.target.push("username");
                }
            }
        }
        throw e;
    }
});
const signInUser = (authUserSignInRequestDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = authUserSignInRequestDto;
    const user = yield DBClient_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (!user) {
        throw new errors_global_1.EntityNotFoundError();
    }
    // compare password
    if (!(yield bcryptjs_1.default.compare(password, user.password))) {
        throw new errors_global_1.UnauthorizedError();
    }
    // generate access token
    const accessToken = jsonwebtoken_1.default.sign({
        userId: user.id,
    }, JWT_SECRET_KEY, {
        expiresIn: 3600, // 1 hour
    });
    // generate refresh token
    const refreshToken = jsonwebtoken_1.default.sign({
        userId: user.id,
    }, JWT_REFRESH_SECRET_KEY, {
        expiresIn: 7 * 24 * 3600, // 7 days
    });
    return {
        accessToken,
        refreshToken,
        userId: user.id,
    };
});
const regenerateAccessToken = (refreshToken) => {
    // verify refresh_token
    const payload = jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_SECRET_KEY);
    // add new access_token to response cookie
    const accessToken = jsonwebtoken_1.default.sign({
        userId: payload.userId,
    }, JWT_SECRET_KEY, {
        expiresIn: 3600, // 1 hour
    });
    return accessToken;
};
exports.default = {
    createUser,
    signInUser,
    regenerateAccessToken,
};
