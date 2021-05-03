const express = require("express");
const router = express.Router();
const CoinbaseClient = require("../models/coinbaseClient");

// GET list of accounts and assosciated value
router.get("/accounts", (req, res, next) => {
    coinbaseClient = new CoinbaseClient().client;
    coinbaseClient.getAccounts({}, (err, accounts) => {
        if (err) {
            next(err);
        } else {
            let resAccounts = { "wallet": {} };
            accounts.forEach((acct) => {
                console.log(acct);
                console.log("\n\n")
                resAccounts["wallet"][acct["currency"]] = acct["balance"];
                resAccounts["wallet"][acct["currency"]]["id"] = acct["id"];
            });
            res.status(200).json(resAccounts);
        }
    });
});

// POST to return account balance object
// account id is sent through POST body
router.post("/account-balace", (req, res, next) => {
    body = req.body;

    // Check that id is in body
    if (id == null || typeof id === 'undefined') {
        err = {
            description: "id not included in request body",
            statusCode: 400
        }
        next(err, req, res);
    }

    coinbaseClient = new CoinbaseClient().client;
    coinbaseClient.getAccount(id, (err, account) => {
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

router.post("/account-transactions", (req, res, next) => {
    body = req.body;
    // check that id is in body
    let id = body.id;
    if (id == null || typeof id === 'undefined') {
        err = {
            description: "id not included in request body",
            statusCode: 400
        }
        next(err, req, res);
    }

    // fetch account
    coinbaseClient = new CoinbaseClient().client;
    coinbaseClient.getAccount(id, (err, account) => {
        if (err) {
            next(err, req, res);
        }

        account.getTransactions(null, function (err, txns) {
            if (err) {
                next(err, req, res);
            }

            let allTxns = [];
            txns.forEach(function (txn) {
                allTxns.push(txn.details);
            });

            // sucess, sends back array of transactions
            res.status(200).json(allTxns);
        });
    });
});

module.exports = router;