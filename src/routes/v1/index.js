const express = require('express');

const doctorRouter = require('./doctor.route');
const userRouter = require('./user.route');
const appointmentRouter = require('./appointment.route')

const v1Router = express.Router();

v1Router.use('/doctors',doctorRouter);
v1Router.use('/users',userRouter);
v1Router.use('/appointments',appointmentRouter);

module.exports = v1Router;