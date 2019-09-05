const all_coins_url = 'https://api.coingecko.com/api/v3/coins/list';
const single_coin_url = 'https://api.coingecko.com/api/v3/coins/'
var coinsArray = [];
getCoins();
load();
function getCoins() {
    $.ajax({
        type: 'GET',
        datatype: 'json',
        url: all_coins_url,
        async: false,
        success: function (data) {

            coins = data.splice(100, 100);
            coins.forEach((value) => { coinsArray.push([value.symbol, value.name, value.id]) });
            window.localStorage.coinsList = JSON.stringify(coins);
            for (let i = 0; i < coinsArray.length; i++) {
                var element = coinsArray[i];
                var symbol = element[0];
                var name = element[1];
                var id = element[2];
                createCard(symbol, name, id);
            }

        },
        error: function (error) {
            console.log("error : ", error)
        },
        complete: function () {

        }
    })
}

function moreInfo(symbol) {
    var singe_url = single_coin_url + symbol;
    $.ajax({
        type: 'GET',
        datatype: 'json',
        url: singe_url,
        async: false,
        id: symbol,
        success: function (data) {
            var image_url = data.image.large;
            var usd_price = data.market_data.current_price.usd;
            var eur_price = data.market_data.current_price.eur;
            var ils_price = data.market_data.current_price.ils;

            console.log(eur_price);
            var string = '';
            string = '<div class="container col"><img src = "' + image_url + '" alt = "" class="logo-img" ></div ><div class="container col"><p class="moreinfo" id="">' + eur_price + ' EUR</p><p class="moreinfo" id="">' + usd_price + ' USD</p><p class="moreinfo" id="">' + ils_price + ' ILS</p></div>'
            $('#inforow_' + symbol).html(string);
        },
        error: function (error) {
            console.log("error : ", error)
        },
        complete: function () {

        }
    })
}

function load() {

}

function createCard(symbol, name, id) {
    var string = '<div class="container col-sm-4 box-shaded" id="container_' + symbol + '">';
    string += '<div class="row justify-content-between"><div class="container col"><h2>' + symbol + '</h2>';
    string += '</div><div class="custom-control custom-switch"><div class="checkbox checkbox-slider--b-flat checkbox-slider-md">';
    string += '<label><input type="checkbox" id="checkbox_' + symbol + '"><span></span></label></div></div></div>';
    string += '<div><p class="fullname">' + name + '</p></div><div class="row info" id="inforow_' + id + '"></div>';
    string += '<button type="button" class="btn btn-outline-secondary" onclick="moreInfo(this.id)" id="' + id + '">More info</button></div>';
    $('#for_insert').append(string);

}