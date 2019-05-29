const userRouter = require("./routers/usersRouter");
const express = require("express");
const app = express();

// utility middlware
app.use(express.json());

// endpoint middlware
app.use('/api', userRouter);

module.exports = app;