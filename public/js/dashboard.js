let portfolioValueObject;
let accountsObject;

const populatePortfolioValue = () => {
    $.ajax({
        type: 'get',
        url: "http://localhost:3007/account-info/portfolio-value",
        cache: false,
        async: 'asynchronous',
        success: function (portfolioValueResponse) {
            // cache portfolio value object response
            portfolioValueObject = portfolioValueResponse;
            document.getElementById('portfolio-value').innerHTML = portfolioValueResponse.totalBalance;
            document.getElementById('portfolio-currency').innerHTML = portfolioValueResponse.nativeCurrency;
        },
        error: function (request, status, error) {
            alert("Couldn't fetch portfolio value");
            document.getElementById('portfolio-value').innerHTML = '00.00';
        }
    });
};

const populateAccountList = () => {
    $.ajax({
        type: 'get',
        url: "http://localhost:3007/account-info/accounts",
        cache: false,
        async: 'asynchronous',
        success: function (accountsResponse) {
            accountsObject = accountsResponse;
            accounts = accountsObject.wallet;
            let htmlStr = "";
            for (coin in accounts) {
                if (Number(accounts[coin].amount) > 0) {
                    htmlStr += `<li class="p-4 hover:bg-gray-50 cursor-pointer font-bold text-blue-800">${accounts[coin].currency}</li>`
                }
            }
            document.getElementById('account-list').innerHTML = htmlStr;
        },
        error: function (request, status, error) {
            alert("Couldn't fetch account data");
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    // Call all necessary population functions
    populatePortfolioValue();
    populateAccountList();
    // set functions to execute and update data every 1 min
    window.setInterval(() => {
        populatePortfolioValue();
    }, 60000);
});
