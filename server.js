const express = require("express");
var Coinbase = require('coinbase');

// Load API auth values from .env
require('dotenv').config();
const key = process.env.API_KEY;
const secret = process.env.API_SECRET;

// Initialize coinbase client
var client = new Coinbase.Client({
    apiKey: key,
    apiSecret: secret,
    strictSSL: false
});

// Initialize express server
const server = express();

// GET list of accounts and assosciated value
server.get("/accounts", (req, res, next) => {
    client.getAccounts({}, function (err, accounts) {
        if (err) {
            next(err);
        } else {
            let resAccounts = { "wallet": {} };
            accounts.forEach(function (acct) {
                resAccounts["wallet"][acct["currency"]] = acct["balance"];
            });
            res.status(200).json(resAccounts);
        }
    });
});

server.get("/btc-price-usd", (req, res) => {
    client.getBuyPrice({ 'currencyPair': 'BTC-USD' }, function (err, result) {
        if(err){
            next(err);
        } else {
            res.status(200).json(result["data"]);
        }
    });
});


// client error handler
server.use(function (err, req, res, next) {
    res.status(err.statusCode || 500).json(err);
    next(err, req, res);
});

// server error handler
server.use(function (err, req, res, next) {
    console.error(err.stack);
    console.error(err.statusCode);
});

const PORT = process.env.PORT || 3007;
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});
