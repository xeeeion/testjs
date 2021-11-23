const { Router } = require("express");
//const ErrorResponse = requrie("../")
const User = require("../dataBase/models/User.model");
const Token = require("../dataBase/models/Token.model");
const { asyncHandler, requireToken } = require("../middlewares/middelwares");

const router = Router();

function initRoutes() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(getUserInfo));
  router.patch("/me", asyncHandler(requireToken), asyncHandler(updateUserInfo));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(userLogout));
}

async function getUserInfo(req, res, next) {
  let user = await User.findOne({
    where: {
      userId: req.userId,
    },
  });

  res.status(200).json(user);
}

async function updateUserInfo(req, res, next) {
  let user = await User.findOne({
    where: {
      userId: req.userId,
    },
  });

  res.status(200).json(user);
}

//user logout
async function userLogout(req, res, next) {
  await Token.destroy({
    where: {
      value: req.header("x-access-token"),
    },
  });

  res.status(200).json({ message: "Logout out" });
}

initRoutes();

module.exports = router;
