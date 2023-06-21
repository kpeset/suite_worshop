// import express & global middlewares
const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require("../middlewares/errorHandler");

// import router
const apiRouter = require("../modules");

// Instanciate your app (http server)
const app = express();

// apply global middlewares (!important: before any routes !)
app.use(cors({ origin: "http://localhost:3000" }));
app.use(helmet());
app.use(express.json());

// link router to your app
app.use(apiRouter);

// global error handler middleware
app.use(errorHandler);

module.exports = app;