let portfolioValueObject;

const populatePortfolioValue = () => {
    console.log("yes");
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

document.addEventListener("DOMContentLoaded", () => {
    // Call all necessary population functions
    populatePortfolioValue();
    // set functions to execute and update data every 1 min
    window.setInterval(() => {
        populatePortfolioValue();
    }, 60000);
});
