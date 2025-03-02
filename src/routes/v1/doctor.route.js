const express = require("express");
const {doctorController} = require("../../controllers");

const doctorRouter = express.Router();

doctorRouter.get("/", doctorController.getAllDoctors);

doctorRouter.get("/:id",doctorController.getDoctor);

doctorRouter.post("/requests", doctorController.applyForRequests);

module.exports = doctorRouter;