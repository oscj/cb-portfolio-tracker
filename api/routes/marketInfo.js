const express = require("express");
const router = express.Router();
const CoinbaseClient = require("../clients/coinbaseClient");
global.fetch = require('node-fetch');
const { fetchPrice } = require('@exodus/prices');

// GET current bitcoin price
router.get("/btc-price-usd", (req, res, next) => {
    coinbaseClient = new CoinbaseClient().client;
    coinbaseClient.getBuyPrice({ 'currencyPair': 'BTC-USD' }, (err, result) => {
        if (err) {
            next(err, req, res);
        } else {
            res.status(200).json(result["data"]);
        }
    });
});

// POST request for getting the price of a given coin in a requested currency
// params are included in post body
router.post("/coin-price-in-curr", (req, res, next) => {
    let body = req.body;
    let from = body.from;
    let to = body.to;

    if (checkIfNullOrUndefined(from) || checkIfNullOrUndefined(to)) {
        let err = new Error();
        err.message = "from or to field in request body was undefined";
        next(err);
    }

    coinbaseClient = new CoinbaseClient().client;
    coinbaseClient.getBuyPrice({ 'currencyPair': `${from.toUpperCase()}-${to.toUpperCase()}` }, (err, result) => {
        if (err) {
            next(err, req, res);
        } else {
            res.status(200).json(result["data"]);
        }
    });
});

// POST request for getting the historical price of a coin
router.post("/coin-price-at-date", async (req, res, next) => {
    let body = req.body;
    let date = body.date;
    let coin = body.coin;
    let currency = body.currency;

    if (checkIfNullOrUndefined(date) || checkIfNullOrUndefined(coin) || checkIfNullOrUndefined(currency)) {
        let err = new Error();
        err.message = "required parameters in request body were undefined";
        next(err);
    }
    try {
        const formattedDate = new Date(date);
        const coinPrice = await fetchPrice(coin, currency, formattedDate);
        res.status(200).json(coinPrice.toFixed(3));
    } catch (error) {
        let err = new Error();
        err.message = `Error getting ${coin} price for ${date}. Please make sure coin name and date are formatted and spelled correctly.`
        next(err);
    }
});

function checkIfNullOrUndefined(variable) {
    return (variable == null || typeof variable === 'undefined');
}

module.exports = router;