const express = require('express');
const {userController} = require('../../controllers');

const userRouter = express.Router();

userRouter.get('/',userController.getUsers);

userRouter.get('/:id',userController.getUser);

userRouter.post('/',userController.registerUser);

module.exports = userRouter;