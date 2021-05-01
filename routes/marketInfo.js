const express = require("express");
const router = express.Router();

// Load API auth values from .env
require('dotenv').config();
const key = process.env.API_KEY;
const secret = process.env.API_SECRET;

var Coinbase = require('coinbase');
// Initialize coinbase client
var coinbaseClient = new Coinbase.Client({
    apiKey: key,
    apiSecret: secret,
    strictSSL: false
});


// GET current bitcoin price
router.get("/btc-price-usd", (req, res) => {
    coinbaseClient.getBuyPrice({ 'currencyPair': 'BTC-USD' }, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result["data"]);
        }
    });
});

module.exports = router;