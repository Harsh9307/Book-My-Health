const express = require('express');

const doctorRouter = require('./doctor.route');
const userRouter = require('./user.route');

const v1Router = express.Router();

v1Router.use('/doctor',doctorRouter);
v1Router.use('/user',userRouter);

module.exports = v1Router;