# cb-portfolio-tracker

Coinbase does not let you see your percentage P/L on owned assets. This application serves to show your portfolio P/L and give you insights to the development of your investments.

![screenshot](https://github.com/oscjaimes/cb-portfolio-tracker/blob/main/screenshots/screenshot.png)

# set up

## 1. configure .env file with API key

create a .env file in the root of your cloned directory with your own Coinbase API Key and API secret. Make sure the file is in the following form:

``` 
API_KEY=<YOUR_API_KEY>
API_SECRET=<YOUR_API_SECRET>
```

# development
You can run the node server (on a specified port) and the electron application simultaneously with the following command:
```
npm run dev <PORT>
```

To run the server by itself, 
```
npm run server <PORT>
```

If you do not supply a port, the server will run on 3007 by default.

To run the electron application by itself,
```
npm run electron
```

# api

Base Route: __/account-info__
Type | Route | Body Params | Response
-----|-------|--------|--------
__GET__  | /accounts | none | All available accounts and their associated coin amounts)
__GET__ | /portfolio-value | none | Total portfolio value in user's native currency
__POST__ | /account-balance | __id__ : account id | Balance for specified account id in user's native currency
__POST__ | /account-transactions | __id__ : account id | A list of all transactions for specified account id

Base Route: __/market-info__
Type | Route | Body Params | Response
-----|-------|--------|--------
__POST__  | /coin-price-in-curr | __coin__ : coin ticker <br /> __currency__ : currency | Current coin price in specified currency
__POST__ | /coin-price-at-date  | __coin__ : coin ticker <br /> __currency__ : currency <br /> __date__ : date | The price of the coin at the given date, in the given currency
__POST__ | /change-in-price | __coin__ : coin ticker<br /> __currency__ : currency <br /> __date__ : start date | Percentage and absolute change of price of the specified coin, since the specified date


_Coin ticker is like BTC, ETH, etc... Date is in UTC, currencies are abbreviations (i.e. USD, CAD)_
