const express = require("express");
const server = express();

// enables passing of POST data through x-www-form-urlencoded
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

const accountInfo = require("./routes/accountInfo");            // account info router
const marketInfo = require("./routes/marketInfo");              // market info router
const errorHandler = require("./middlewares/errorHandlers");    // error handler middlewares

// assign routes to routers
server.use("/accountInfo", accountInfo);
server.use("/marketInfo", marketInfo);

// use error handlers
server.use(errorHandler.clientErrorHandler);
server.use(errorHandler.serverErrorHandler);

const PORT = process.env.PORT || 3007;
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});