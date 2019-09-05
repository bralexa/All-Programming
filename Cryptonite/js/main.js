const all_coins_url = 'https://api.coingecko.com/api/v3/coins/list';
const single_coin_url = 'https://api.coingecko.com/api/v3/coins/'
var coinsArray = [];
getCoins();





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

            var counter = 0;
            var i = setInterval(function () {
                // do your thing
                var element = coinsArray[counter];
                var symbol = element[0];
                var name = element[1];
                var id = element[2];
                createCard(symbol, name, id);
                var percent = '<div class="container col align-items-center" id="overallProgress"><h2>Loading coins...</h2><div class="progress"><div class="progress-bar progress-bar-striped progress - bar - animated" style="width:' + counter + '%;"></div></div></div>';
                $('.main-info').html(percent);
                counter++;
                if (counter === 100) {
                    clearInterval(i);
                    $('#overallProgress').empty();
                }
            }, 50);
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

    var counter = 0;
    var i = setInterval(function () {
        var percent = '<div class="container"><div class="progress"><div class="progress-bar progress-bar-striped progress - bar - animated" style="width:' + counter + '%;">' + counter + '%</div></div></div>';
        $('#inforow_' + symbol).html(percent);
        counter++;
        if (counter === 101) {
            clearInterval(i);
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
            string = '<div class="container col"><img src = "' + image_url + '" alt = "" class="logo-img" ></div><div class="container col moreinfo"><p>' + eur_price + ' EUR</p><p>' + usd_price + ' USD</p><p>' + ils_price + ' ILS</p></div>'
            $('#inforow_' + symbol).html(string);
            $('#' + symbol).text('Close');
            $('#' + symbol).attr({
                onclick: 'clearInfo(this.id)'
                
            });
        },
        error: function (error) {
            console.log("error : ", error)
        },
        complete: function () {

        }
    })
        }
    }, 10);
}

function clearInfo(id) {
    $('#' + id).text('More info');
    $('#' + id).attr({
        onclick: 'moreInfo(this.id)'
    });
    $('#inforow_' + id).text('');
}

function createCard(symbol, name, id) {
    var string = '<div class="container col-sm-4 box-shaded" id="container_' + symbol + '">';
    string += '<div class="row justify-content-between"><div class="container col"><h2>' + symbol + '</h2>';
    string += '</div><div class="custom-control custom-switch"><div class="checkbox checkbox-slider--b-flat checkbox-slider-md">';
    string += '<label><input type="checkbox" onchange="handleChange(this, this.id)" id="' + symbol + '"><span></span></label></div></div></div>';
    string += '<div><p class="fullname">' + name + '</p></div><div class="row info" id="inforow_' + id + '"></div>';
    string += '<button type="button" class="btn btn-outline-secondary" onclick="moreInfo(this.id)" id="' + id + '">More info</button></div>';
    $('.for_insert').append(string);
    
}

function handleChange(checkbox, checkedCoin) {
    
    var checkedId = checkedCoin;


    if (checkbox.checked == true) {
        alert(checkedId);
    } else {
        alert(checkedId);
    }
}