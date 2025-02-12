const express = require("express");
const doctorController = require("../../controllers");

const doctorRouter = express.Router();

doctorRouter.get("/", doctorController.getalldoctors);

doctorRouter.get("/:id",doctorController.getDoctor);

doctorRouter.post("/requests", doctorController.applyForRequests);