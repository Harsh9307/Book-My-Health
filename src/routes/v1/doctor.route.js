const express = require("express");
const doctorController = require("../../controllers");

const doctorRouter = express.Router();

doctorRouter.get("/getalldoctors", doctorController.getalldoctors);