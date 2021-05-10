document.addEventListener("DOMContentLoaded", () => {
    populatePortfolioValue();
});

const populatePortfolioValue = () => {
    $.ajax({
        type: 'get',
        url: "http://localhost:3007/account-info/portfolio-value",
        cache: false,
        async: 'asynchronous',
        success: function (json) {
            document.getElementById('portfolio-value').innerHTML = json.totalBalance;
            document.getElementById('portfolio-currency').innerHTML = json.nativeCurrency;
        },
        error: function (request, status, error) {
            alert("Couldn't fetch portfolio value");
            document.getElementById('portfolio-value').innerHTML = '00.00';
        }
    });
};