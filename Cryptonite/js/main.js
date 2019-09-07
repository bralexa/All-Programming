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
            coins = data.splice(2000, 100);
            coins.forEach((value) => { coinsArray.push([value.id, value.name, value.symbol]) });
            // window.localStorage.coinsList = JSON.stringify(coins);
            for (let i = 0; i < 100; i++) {
                var element = coinsArray[i];
                var id = element[0];
                var name = element[1];
                var symbol = element[2];
                createCard(symbol, name, id);

            }
            checkLocalstorage();
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            
            var counter = 0;
            var i = setInterval(function () {
                // do your thing
                var percent = '<div class="container" id="overallProgress"><h3>Loading coins...' + counter + '%</h3><div class="box progress" style="height: 2rem;"><div class="progress-bar progress-bar-striped progress-bar-animated" style="width:' + counter + '%; height: 100%;"></div></div></div>';
                $('.modal-content').html(percent);
                counter++;
                if (counter === 100) {
                    clearInterval(i);
                    $('#overallProgress').empty();
                    modal.style.display = "none";
                }
            }, 20);


        },
        error: function (error) {
            console.log("error : ", error)
        },
        complete: function () {

        }
    })
}

function moreInfo(getId) {
    var singe_url = single_coin_url + getId;

    var counter = 0;
    var i = setInterval(function () {
        var percent = '<div class="container"><div class="progress"><div class="progress-bar progress-bar-striped progress - bar - animated" style="width:' + counter + '%;">' + counter + '%</div></div></div>';
        $('#inforow_' + getId).html(percent);
        counter++;
        if (counter === 100) {
            clearInterval(i);
            $.ajax({
                type: 'GET',
                datatype: 'json',
                url: singe_url,
                async: false,
                success: function (data) {
                    var image_url = data.image.large;
                    var usd_price = data.market_data.current_price.usd;
                    var eur_price = data.market_data.current_price.eur;
                    var ils_price = data.market_data.current_price.ils;
                    string = '<div class="container col"><img src = "' + image_url + '" alt = "" class="logo-img" ></div><div class="container col moreinfo"><p>' + eur_price + '<strong> €</strong></p><p>' + usd_price + '<strong> $</strong></p><p>' + ils_price + '<strong> ₪</strong></p></div>'
                    $('#inforow_' + getId).html(string);
                    $('#' + getId).text('Close');
                    $('#' + getId).attr({
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
    string += '<label><input type="checkbox"  onchange="handleSwitch(this, this.name)" name="' + id + '" id="checkbox_' + id + '"><span></span></label></div></div></div>';
    string += '<div><p class="fullname">' + name + '</p></div><div class="row info" id="inforow_' + id + '"></div>';
    string += '<button type="button" class="btn btn-outline-secondary" onclick="moreInfo(this.id)" id="' + id + '">More info</button></div>';
    $('.for_insert').append(string);

}

function handleSwitch(checkbox, checkedCoin) {

    if (checkbox.checked == true) {
        var counter = localStorage.length;
        console.log(counter);

        if (counter >= 5) {
            setSwitchOff(checkedCoin);
            return;
        } else {
            setToLocalstorage(checkedCoin);
        }



    } else {
        clearFromLocalstorage(checkedCoin)
    }
}

function setSwitchOn(id) {
    $('#checkbox_' + id).click();
}


function setSwitchOff(getid) {


    var counter = 0;
    var i = setInterval(function () {
        counter++;
        if (counter === 1) {
            clearInterval(i);
            $('#checkbox_' + getid).click();
            console.log($('#checkbox_' + getid));

        }
    }, 100);


}


function setToLocalstorage(id) {

    window.localStorage.setItem(id, id);
}

function clearFromLocalstorage(id) {
    window.localStorage.removeItem(id);
}

function checkLocalstorage() {
    if (localStorage.length > 0) {

        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(localStorage.getItem(keys[i]));

        }
        localStorage.clear();
        console.log(values);
        for (let i = 0; i < values.length; i++) {
            setSwitchOn(values[i]);
        }
    }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}