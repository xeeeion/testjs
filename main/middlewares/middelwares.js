const { values } = require("sequelize/types/lib/operators");
const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);

};

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

const notFound = (req, _res, next) => {
    next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _res, _next) => {
    console.log("Error",{
        messsage: error.message,
        stack: err.stack,
    });
    res.status(err.code || 500).json({
        message: err.message,
    });
};

const requireToken = async (req, res, next) => {
    const token = req.header("x-access-token"); //MB use based token
    if (!token) {
        throw new ErrorResponse("You're don't sent token", 404);
    }
    let result = await Token.findOne({
        where: {
            value: token,
        },
    });
    if (!result) {
        throw new ErrorResponse("Token error", 404);

    };

    res.userId = check.userId;
    next();
};

module.exports = {
    asyncHandler,
    syncHandler,
    notFound,
    errorHandler,
    requireToken
};