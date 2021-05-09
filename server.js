const express = require("express");
const server = express();

// Server config
server.use(express.static(__dirname + '/public'));
server.set("views", __dirname + "/views");
server.engine("html", require("ejs").renderFile);

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// enables passing of POST data through x-www-form-urlencoded
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

const accountInfo = require("./routes/accountInfo");            // account info router
const marketInfo = require("./routes/marketInfo");              // market info router
const errorHandler = require("./middlewares/errorHandlers");    // error handler middlewares

// assign routes to routers
server.use("/account-info", accountInfo);
server.use("/market-info", marketInfo);

server.get("/dashboard", (req, res) => {
    res.render('test.html');
});

// use error handlers
server.use(errorHandler.clientErrorHandler);
server.use(errorHandler.serverErrorHandler);

const PORT = process.env.PORT || 3007;
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});