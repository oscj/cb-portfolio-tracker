const express = require("express");
const morgan = require('morgan');
const server = express();

server.use(morgan('combined'))  // Logger
server.use(express.json());
server.use(express.urlencoded({ // enables passing of POST data through x-www-form-urlencoded
    extended: true
}));
server.use(express.static(__dirname + '/public'));

const accountInfo = require("./routes/accountInfo");            // account info router
const marketInfo = require("./routes/marketInfo");              // market info router
const errorHandler = require("./middlewares/errorHandlers");    // error handler middlewares

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// assign routes to routers
server.use("/account-info", accountInfo);
server.use("/market-info", marketInfo);

// use error handlers
server.use(errorHandler.clientErrorHandler);
server.use(errorHandler.serverErrorHandler);

const PORT = process.env.PORT || 3007;
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});