require('dotenv').config();
var Coinbase = require('coinbase');

class CoinbaseClient {
    constructor() {
        let key = process.env.API_KEY;
        let secret = process.env.API_SECRET;
        this._client = new Coinbase.Client({
            apiKey: key,
            apiSecret: secret,
            strictSSL: false
        });
    }

    get client() {
        return this._client;
    }
}

module.exports = CoinbaseClient;