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

            console.log(json);
            document.getElementById('portfolio-value').innerHTML = json.totalBalance;
        },
        error: function (request, status, error) {
            console.log("Couldn't get response from API")
            console.log(error)
        }
    });
};