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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const DBClient_1 = __importDefault(require("../../prisma/DBClient"));
const errors_global_1 = require("../global/errors.global");
const stock_service_1 = __importDefault(require("./stock.service"));
const errors_global_2 = require("../global/errors.global");
const getPublicUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(id);
    const { email, username, favoritePortfolios, favoriteStocks, goalAmount, portfolios, investments, stocks, } = user;
    return {
        id,
        email,
        username,
        portfolios,
        investments,
        stocks,
        favoritePortfolios,
        favoriteStocks,
        goalAmount,
    };
});
const getUser = (id, include = ["portfolios", "investments", "stocks"]) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield DBClient_1.default.user.findUnique({
        where: {
            id,
        },
        include: {
            portfolios: include.includes("portfolios")
                ? {
                    include: {
                        investments: true,
                    },
                }
                : false,
            investments: include.includes("investments"),
            stocks: include.includes("stocks")
                ? {
                    include: {
                        company: true,
                    },
                }
                : false,
        },
    });
    if (!user) {
        throw new errors_global_1.EntityNotFoundError();
    }
    return user;
});
const addStock = (id, stock) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(id, ["stocks"]);
    const hasStock = () => user.stocks.filter(({ id }) => stock.id === id).length > 0;
    if (!hasStock()) {
        // add stock to user.stocks only if it doesn't exist
        const newStocks = [...user.stocks, stock];
        yield DBClient_1.default.user.update({
            data: {
                stocks: {
                    set: newStocks.map(stock => ({ id: stock.id })),
                },
            },
            where: {
                id,
            },
        });
    }
});
const getStocks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(id, ["stocks"]);
    return user.stocks;
});
const getFavoritePortfolios = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield DBClient_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            favoritePortfolios: true,
        },
    });
    if (!user) {
        throw new errors_global_1.EntityNotFoundError();
    }
    return user.favoritePortfolios;
});
const addToFavoritePortfolios = (id, portfolioId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield DBClient_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            favoritePortfolios: true,
        },
    });
    if (!user) {
        throw new errors_global_1.EntityNotFoundError();
    }
    if (user.favoritePortfolios.includes(portfolioId)) {
        return user.favoritePortfolios;
    }
    // add portfolioId to favorites only if it doesn't already exist
    const udpatedUser = yield DBClient_1.default.user.update({
        data: {
            favoritePortfolios: {
                set: [...user.favoritePortfolios, portfolioId],
            },
        },
        where: {
            id,
        },
    });
    return udpatedUser.favoritePortfolios;
});
const deleteFromFavoritePortfolios = (id, portfolioId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield DBClient_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            favoritePortfolios: true,
        },
    });
    if (!user) {
        throw new errors_global_1.EntityNotFoundError();
    }
    if (!user.favoritePortfolios.includes(portfolioId)) {
        return user.favoritePortfolios;
    }
    const udpatedUser = yield DBClient_1.default.user.update({
        data: {
            favoritePortfolios: {
                set: user.favoritePortfolios.filter(favoritePortfolioId => favoritePortfolioId !== portfolioId),
            },
        },
        where: {
            id,
        },
    });
    return udpatedUser.favoritePortfolios;
});
const getFavoritStocks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield DBClient_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            favoriteStocks: true,
        },
    });
    if (!user) {
        throw new errors_global_1.EntityNotFoundError();
    }
    return user.favoriteStocks;
});
const getNewStocks = (investments, stocks, stockId) => {
    // - add stocks only if it doens't already exist
    // - upon deleting from favorite stocks,
    //   delete the stock from stocks if it's not one of the user's investments
    const investmentWithStockId = investments.find(investment => investment.stockId === stockId);
    return investmentWithStockId
        ? stocks
        : stocks.filter(stock => stock.id !== stockId);
};
const addToFavoriteStocks = (id, stockId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield DBClient_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            favoriteStocks: true,
            investments: {
                select: {
                    stockId: true,
                },
            },
            stocks: true,
        },
    });
    if (!user) {
        throw new errors_global_1.EntityNotFoundError();
    }
    if (user.favoriteStocks.includes(stockId)) {
        return user.favoriteStocks;
    }
    // add portfolioId to favorites only if it doesn't already exist
    const stock = yield stock_service_1.default.getStock(stockId);
    if (!stock) {
        throw new errors_global_1.EntityNotFoundError();
    }
    const newStocks = getNewStocks(user.investments, user.stocks, stockId).map(stock => ({
        id: stock.id,
    }));
    const udpatedUser = yield DBClient_1.default.user.update({
        data: {
            favoriteStocks: {
                set: [...user.favoriteStocks, stockId],
            },
            stocks: {
                set: newStocks,
            },
        },
        where: {
            id,
        },
    });
    return udpatedUser.favoriteStocks;
});
const deleteFromFavoriteStocks = (id, stockId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield DBClient_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            favoriteStocks: true,
            investments: {
                select: {
                    stockId: true,
                },
            },
            stocks: true,
        },
    });
    if (!user) {
        throw new errors_global_1.EntityNotFoundError();
    }
    const newStocks = getNewStocks(user.investments, user.stocks, stockId).map(stock => ({
        id: stock.id,
    }));
    const udpatedUser = yield DBClient_1.default.user.update({
        data: {
            favoriteStocks: {
                set: user.favoriteStocks.filter(favoriteStockId => favoriteStockId !== stockId),
            },
            stocks: {
                set: newStocks,
            },
        },
        where: {
            id,
        },
    });
    return udpatedUser.favoriteStocks;
});
const deleteStockWithNoReferenceFromUser = (userId, stockId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(userId);
    if (user.investments.find(investment => investment.stockId === stockId)) {
        return;
    }
    if (user.favoriteStocks.includes(stockId)) {
        return;
    }
    // delete stock only if it's not part of any entities (investment, favoriteStocks)
    const updatedUser = yield DBClient_1.default.user.update({
        data: {
            stocks: {
                set: user.stocks
                    .filter(stock => stock.id !== stockId)
                    .map(stock => ({
                    id: stock.id,
                })),
            },
        },
        where: {
            id: userId,
        },
        include: {
            stocks: true,
        },
    });
    if (!updatedUser) {
        return new errors_global_2.InternalServerError();
    }
});
const updatePassword = (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(id, []);
    if (bcryptjs_1.default.compareSync(newPassword, user.password)) {
        // old & new passwords are equal
        return {
            success: false,
            message: "Please provide a new password.",
        };
    }
    const salt = yield bcryptjs_1.default.genSalt();
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
    const updatedUser = yield DBClient_1.default.user.update({
        data: {
            password: hashedPassword,
        },
        where: {
            id,
        },
    });
    if (!updatedUser) {
        throw new errors_global_2.InternalServerError();
    }
    return {
        success: true,
        message: "Successfully updated the password.",
    };
});
const updateGoalAmount = (id, newGoalAmount) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(id, []);
    if (newGoalAmount === user.goalAmount) {
        // old & new goal amounts are equal
        return {
            success: false,
            message: "Please provide a new goal amount.",
        };
    }
    const updatedUser = yield DBClient_1.default.user.update({
        data: {
            goalAmount: typeof newGoalAmount === "string"
                ? parseFloat(newGoalAmount)
                : newGoalAmount,
        },
        where: {
            id,
        },
    });
    if (!updatedUser) {
        throw new errors_global_2.InternalServerError();
    }
    return {
        success: true,
        message: "Successfully updated the goal amount.",
    };
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield DBClient_1.default.user.delete({
        where: {
            id,
        },
    });
    if (!user) {
        return {
            success: false,
            message: "Something went wrong!",
        };
    }
    return {
        success: true,
        message: "Successfully deleted the account.",
    };
});
exports.default = {
    getPublicUser,
    getUser,
    addStock,
    getStocks,
    getFavoritePortfolios,
    addToFavoritePortfolios,
    deleteFromFavoritePortfolios,
    getFavoritStocks,
    addToFavoriteStocks,
    deleteFromFavoriteStocks,
    deleteStockWithNoReferenceFromUser,
    updatePassword,
    updateGoalAmount,
    deleteUser,
};
