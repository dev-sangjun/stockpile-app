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
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const errors_global_1 = require("../global/errors.global");
const signUpUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authUserSignUpRequestDto = req.body;
    try {
        const authUserResponseDto = yield services_1.authService.createUser(authUserSignUpRequestDto);
        return res.json(authUserResponseDto);
    }
    catch (e) {
        return next(e);
    }
});
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authUserSignInRequestDto = req.body;
    try {
        const { accessToken, refreshToken, userId } = yield services_1.authService.signInUser(authUserSignInRequestDto);
        return res
            .cookie("access_token", accessToken, {
            httpOnly: true,
            sameSite: true,
        })
            .cookie("refresh_token", refreshToken, {
            httpOnly: true,
            sameSite: true,
        })
            .json({ userId });
    }
    catch (e) {
        return next(e);
    }
});
const signOutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res
            .clearCookie("access_token")
            .clearCookie("refresh_token")
            .sendStatus(200);
    }
    catch (e) {
        return next(e);
    }
});
const regenerateAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            throw new errors_global_1.UnauthorizedError();
        }
        const newAccessToken = services_1.authService.regenerateAccessToken(refreshToken);
        return res
            .cookie("access_token", newAccessToken, {
            httpOnly: true,
            sameSite: true,
        })
            .json({
            success: true,
        });
    }
    catch (e) {
        return next(e);
    }
});
exports.default = { signUpUser, signInUser, signOutUser, regenerateAccessToken };
