const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const { asyncHandler, requireToken } = require("../middlewares/middelwares");

const router = Router();

function initRoutes() {
    router.get("/", asyncHandler(requireToken), asyncHandler(get));
  router.get("/:id", asyncHandler(requireToken), asyncHandler(getByID));
  router.post("/", asyncHandler(requireToken), asyncHandler(create));
  router.patch("/:id", asyncHandler(requireToken), asyncHandler(update));
  router.delete("/:id", asyncHandler(requireToken), asyncHandler(deleteByID));
  router.delete("/", asyncHandler(requireToken), asyncHandler(deleteAll));
}

//get req
async function get(req, res, next) {
    let goal = await ToDo.findAll({
        where: {
            userId: req.userId,
        },
    });

    res.status(200).json({ goal });
    console.log(goal);
}

//get by id 
async function getByID(req, res, next) {
    let goal = await ToDo.findOne({
        where: {
            id: req.params.id, 
            userId: req.userId,
        },
    });
    res.status(200).json(goal);
    console.log(goal);
}

//add new task
async function addNew(req, res, next) {
    let todo = {
        userId: req.userId,
        title: req.body["title"],
        description: req.body["description"],
    };

    if (!todo.title || !todo.description){
        new ErrorResponse("No data filled!", 400);
    }
    let goal = await ToDo.create(todo);

    res.status(200).json(goal);
    console.log(goal.title);
}

//update
async function update(req, res, next) {
    if(!req.body["id"]) {
        new ErrorResponse("Not found", 404)
    }
    if (!req.body["title"] && !req.body["description"]) {
        new ErrorResponse("Don't change anything", 400);
    }

    let id = req.body["id"];
    let goal = await ToDo.update(req.body, {
        where: {
            id: req.params.id,
            userId: req.userId,
        },
    });
    res.status(200).json({ message: "Goal was updated "});
    console.log("Goal ", id, " was updated");
}

//delete define goal
async function deleteDef(req, res, next) {
    await ToDo.destroy({
      where: {
        id:req.params.id,
        userId: req.userId,
      },
    });
  
    res.status(200).json({ message: "Your goal deleted" });
  }
  
  //delete all goals
  async function deleteAll(req, res, next) {
     await ToDo.findOne({
      where: {
        userId: req.userId,
      },
    });
  
    res.status(200).json({ message: "Yr goals was cleaned"});
  }
  
  initRoutes();
  
  module.exports = router;
  