const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const { nanoid } = require("nanoid");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const { asyncHandler } = require("../");
const { Op } = require("sequelize");


const router = Router();

function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/login", asyncHandler(login));
}

async function registration(req, res, next) {
  let used = await User.findOne({
    attributes: ["login", "email"],
        where: {
        [Op.or]: [
                {
                    email: req.body.email,
                    login: req.body.login,
                },
            ],
        },
    });
    if (user){ 
        throw new ErrorResponse("Login and email already used", 400);
    }
    
    user = await User.create(req.body);
    
    res.status(200).json(user);
}

async function login(req, res, next){ 
    let user = await User.findOne({
        attributes: ["id", "password", "login"],
        where: {
            login: req.res.login,
            password: req.body.password,
        },
    });
    if(!user) {
        throw new ErrorResponse("Wrong login or password", 400);
    }
    
    const token = await Token.create({
        userId: user.id,
        value: nanoid(128),
    });
    res.status(200).json({ 
        accessToken: token.value 
    });
}

initRoutes();

module.exports = router;