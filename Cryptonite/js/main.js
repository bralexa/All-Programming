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
                var percent = '<div class="container" id="overallProgress"><h3 class="text-center">Loading coins...' + counter + '%</h3><div class="box progress" style="height: 2rem;"><div class="progress-bar progress-bar-striped progress-bar-animated" style="width:' + counter + '%; height: 100%;"></div></div></div>';
                $('.modal-content').html(percent);
                counter++;
                if (counter === 101) {
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
    string += '<button type="button" class="btn btn-outline-secondary box-shaded" onclick="moreInfo(this.id)" id="' + id + '">More info</button></div>';
    $('.for_insert').append(string);

}

function createMiniCards() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var header = '<h3 class="text-center"><strong>Live reports can be produced for 5 coins only.</br>Please review your choices.</strong></h3>';
    $('.modal-content').append(header);
    if (localStorage.length > 0) {




        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(localStorage.getItem(keys[i]));

        }

        
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < coinsArray.length; j++) {
                var element = coinsArray[j];
                if (element[0] === values[i]) {
                    var symbol = element[1];
                    var id = element[0];

                }
            }
            createMiniContent(id, symbol);

        }
    }

    function createMiniContent(id, symbol) {
        var string = '<div class="container col-sm-12 box-shaded">';
        string += '<div class="row d-flex align-items-center justify-content-between"><div class="container col"><p>' + symbol + '</p>';
        string += '</div><div class="custom-control custom-switch"><div class="checkbox checkbox-slider--b-flat checkbox-slider-md">';
        string += '<label><input type="checkbox" checked onchange="handleSwitch(this, this.name)" name="' + id + '" id="minicheckbox_' + id + '"><span></span></label></div></div></div>';

        $('.modal-content').append(string);
    }
    var button = '<div class="container text-center"><button type="button" class="btn btn-outline-secondary box-shaded" onClick="document.location.reload(true)">Save an close</button></div>';
    $('.modal-content').append(button);
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "block";
            // closeModal();
            // document.location.reload(true);
        }

    }

}

function aboutMe() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var header = '<h3 class="text-center"><strong>Alexander Bruder</strong></h3>';
    $('.modal-content').append(header);
    createMiniContent()

    function createMiniContent() {
        var string = '<div class="container col-sm-12 box-shaded">';
        string += '<div class="container col text-center"><img class="box-shaded img-fluid" src="img/Me.jpg"></div><div class="container text-center"><h3>Full Stack Developer</h3></div>';
        string += '<div class="container text-center"><p><strong>Contacts:</strong></p></div><div class="container text-center"><p>Mobile: <a href="tel:+972548887511">+972548887511</a></p></div><div class="container text-center"><p>E-mail: <a href="mailto:nive.bald.man@gmail.com">nice.bald.man@gmail.com</a></p></div>';

        $('.modal-content').append(string);
    }
    var button = '<div class="container text-center"><button type="button" class="btn btn-outline-secondary box-shaded" onClick="closeModal()">Close</button></div>';
    $('.modal-content').append(button);
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "block";
            // closeModal();
            // document.location.reload(true);
        }

    }

}

function handleSwitch(checkbox, checkedCoin) {

    if (checkbox.checked == true) {
        var counter = localStorage.length;
        console.log(counter);

        if (counter >= 5) {
            setSwitchOff(checkedCoin);
            createMiniCards();
            return;
        } else {
            setToLocalstorage(checkedCoin);
        }



    } else {
        clearFromLocalstorage(checkedCoin);
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

function liveReports() {
    if (localStorage.length == 0) {
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close");
        modal.style.display = "block";

        var message = '<span class="close text-right" onClick="closeModal()">&times;</span><div class="container"><h2 class="text-center">No coins chosen!</h2></div > ';
        $('.modal-content').html(message);
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                closeModal();
            }

        }



    }

}

function closeModal() {
    $('.modal-content').empty();
    modal.style.display = "none";

}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
// btn.onclick = function () {
//     modal.style.display = "block";
// }

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