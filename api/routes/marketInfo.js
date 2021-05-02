const express = require("express");
const router = express.Router();
const CoinbaseClient = require("../clients/coinbaseClient");


// GET current bitcoin price
router.get("/btc-price-usd", (req, res) => {
    coinbaseClient = new CoinbaseClient().client;
    coinbaseClient.getBuyPrice({ 'currencyPair': 'BTC-USD' }, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(result["data"]);
        }
    });
});

module.exports = router;