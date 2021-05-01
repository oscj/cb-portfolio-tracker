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


// GET list of accounts and assosciated value
router.get("/accounts", (req, res, next) => {
    coinbaseClient.getAccounts({}, (err, accounts) => {
        if (err) {
            next(err);
        } else {
            let resAccounts = { "wallet": {} };
            accounts.forEach((acct) => {
                resAccounts["wallet"][acct["currency"]] = acct["balance"];
                resAccounts["wallet"][acct["currency"]]["id"] = acct["id"];
            });
            res.status(200).json(resAccounts);
        }
    });
});

// GET account balance
router.post("/account-balace", (req, res, next) => {
    body = req.body;

    // Check that id is in body
    let id = body.id;
    if (id == null || typeof id === 'undefined') {
        err = {
            description: "id not included in request body",
            statusCode: 400
        }
        next(err, req, res);
    }

    coinbaseClient.getAccount(id, function (err, account) {
        if (err) {
            next(err, req, res);
        }

        // Return account balance and currency name
        res.status(200).json({
            balance: account.balance.amount,
            currency: account.balance.currency
        });
    });

});


module.exports = router;