let portfolioValueObject = {};
let accountsObject = {};

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
                    console.log(coin);
                    htmlStr += `<li class="p-4 hover:bg-gray-50 cursor-pointer font-bold text-blue-800">${accounts[coin].currency}</li>`
                }
            }
            document.getElementById('account-list').innerHTML = htmlStr;

            populatePortfolioPieChart(accountsObject);
        },
        error: function (request, status, error) {
            alert("Couldn't fetch account data");
        }
    });
};

const populatePortfolioPieChart = async (accountsObject) => {
    let accounts = accountsObject.wallet;
    let totalValues = {};
    for (coin in accounts) {
        if (Number(accounts[coin].amount) > 0) {
            totalCoins = accounts[coin].amount;
            await $.ajax({
                type: 'post',
                url: "http://localhost:3007/market-info/coin-price-in-curr",
                contentType: 'application/x-www-form-urlencoded',
                data: $.param({ coin: accounts[coin].currency, currency: 'CAD' }),
                cache: false,
                async: 'asynchronous',
                success: function (res) {
                    console.log(`Total coins: ${totalCoins}, PPC : ${res.amount}`)
                    value = Number(res.amount) * totalCoins;
                    totalValues[res.base] = (value);
                },
                error: function (request, status, error) {
                    console.log(error);
                    alert("Couldn't fetch account data");
                }
            });
        }
    }

    labels = [];
    values = [];
    colors = [];
    for (coin in totalValues) {
        labels.push(coin);
        values.push(totalValues[coin]);

        let red = getRndInteger(0, 255);
        let green = getRndInteger(0, 255);
        let blue = getRndInteger(0, 255);
        colors.push(`rgb(${red}, ${green}, ${blue})`);
    }


    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                hoverOffset: 4
            }]
        },
        options: {
            title: {
                display: true,
                fullSize: true,
                text: 'Investment Breakdown',
                font: {
                    weight: 'bold'
                }
            }
        }
    });

};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("DOMContentLoaded", () => {
    // Call all necessary population functions
    populatePortfolioValue();
    populateAccountList();
    // set functions to execute and update data every 1 min
    window.setInterval(() => {
        populatePortfolioValue();
    }, 60000);
});
