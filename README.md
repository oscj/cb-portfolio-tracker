# cb-portfolio-tracker

Coinbase does not let you see your percentage P/L on owned assets. This application serves to show your portfolio P/L and give you insights to the development of your investments.

### Set up

#### 1. Configure .env file with API key
create a .env file in the root of your cloned directory with your own Coinbase Pro API Key and API secret. Make sure the file is in the following form:

```
API_KEY=<YOUR_API_KEY>
API_SECRET=<YOUR_API_SECRET>
```

### Components

- The __api/__ folder contains Node js express app for interfacing with Coinbase API

- The __potfoliotacker/__ directory contains a dart application (developed for the web) to display portfolio information.