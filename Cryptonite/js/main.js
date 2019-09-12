const all_coins_url = 'https://api.coingecko.com/api/v3/coins/list';
const single_coin_url = 'https://api.coingecko.com/api/v3/coins/';
const multyCoinsURL = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=';
const apiKey = '&tsyms=USD&api_key=5eb33644f883867df9a7bbfa198466834a89e30b0f477d87a36e5d8e7b481d42';
var coinsForLive = [];
var values = [];
var viewArray = [];
var coinsArray = [];

$(document).ready(function () {
    var header = '<h1 class="header-crypto display-7 text-fluid"><strong>CRYPTONITE</strong></h1><p class="text-center font-weight-light" > cryptocoins online search engine</p >';
    $('.first').html(header);
    var subheader = '<div class="row"><div class="box col-sm-6 d-flex align-items-center justify-content-between">';
    subheader += '<button type="button" class="btn btn-outline-secondary box-shaded mybutton" value="Reload Page" onClick="document.location.reload(true)">All coins</button>';
    subheader += '<button type="button" class="btn btn-outline-secondary box-shaded" onClick="liveReports()">Livereports</button>';     
    subheader += '<button type="button" class="btn btn-outline-secondary box-shaded mybutton" onClick="aboutMe()">About me</button></div >';              
    subheader += '<div class="box col-sm-6 d-flex align-items-center justify-content-between">';
    subheader += '<input type="text" id="searchInput" class="form-control box-shaded" placeholder="Find your favorite coin">';
    subheader += '<button type="button" class="btn btn-outline-secondary box-shaded mybutton" onclick="coinSearcher()">Search!</button></div></div>';
    $('.sub-header').html(subheader);
    getCoins();
    filter();
});



function getCoins() {
    $('.for_insert').empty();

    var counter = 0;
    var i = setInterval(function () {

        var percent = '<div class="card box-shaded" id="overallProgress"><h4 class="text-center">Loading coins...   ' + counter + '%</h4><div class="box progress" style="height: 2rem;"><div class="progress-bar progress-bar-animated" style="width:' + counter + '%; height: 100%;"></div></div></div>';
        $('.forprogress-bar').html(percent);
        counter++;
        if (counter === 100) {
            clearInterval(i);
            var message = '<div class="card box-shaded" id="overallProgress"><h4 class="text-center">Still waiting....</h4><div class="box progress" style="height: 2rem;"><div class="progress-bar progress-bar-striped progress-bar-animated" style="width:100%; height: 100%;"></div></div></div>';
            $('.forprogress-bar').html(message);
        }
    }, 10);
    $.ajax({
        type: 'GET',
        datatype: 'json',
        url: all_coins_url,
        async: true,
        success: function (data) {
            data.forEach((value) => { coinsArray.push([value.id, value.name, value.symbol]) });
            coins = data.splice(500, 100);
            coins.forEach((value) => { viewArray.push([value.id, value.name, value.symbol]) });
        },
        error: function () {
            var modal = document.getElementById("myModal");
            modal.style.display = "block";

            var message = '<div class="container"><p class="text-center">No connection!</p></div > ';
            $('.modal-content').html(message);
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    closeModal();
                }

            };
        },
        complete: function () {
            for (let i = 0; i < 100; i++) {
                var element = viewArray[i];
                var id = element[0];
                var name = element[1];
                var symbol = element[2];
                createCard(symbol, name, id);
                
            }
            clearInterval(i);
            $('.forprogress-bar').empty();
            checkLocalstorage();
        }
    });

}

function moreInfo(getId) {
    var singe_url = single_coin_url + getId;

    var counter = 0;
    var i = setInterval(function () {
        var percent = '<div class="container"><div class="progress"><div class="progress-bar progress-bar-striped progress - bar - animated" style="width:' + counter + '%;">' + counter + '%</div></div></div>';
        $('#progressrow_' + getId).html(percent);
        counter++;
        if (counter === 100) {
            clearInterval(i);
            var message = '<div class="container"><div class="progress"><div class="progress-bar progress-bar-striped progress - bar - animated" style="width:' + counter + '%;">Still waiting...</div></div></div>';
            $('#progressrow_' + getId).html(message);

        }
    }, 10);
    $.ajax({
        type: 'GET',
        datatype: 'json',
        url: singe_url,
        async: true,
        success: function (data) {
            var image_url = data.image.large;
            var usd_price = data.market_data.current_price.usd;
            var eur_price = data.market_data.current_price.eur;
            var ils_price = data.market_data.current_price.ils;
            string = '<div class="container box-shaded col d-flex align-items-center justify-content-between><div class="container col"><img src = "' + image_url + '" class="logo-img" ></div><div class="container box-shaded col moreinfo text-center"><p><strong>Price:</strong></p><h5>' + eur_price + '<strong> €</strong></h5><h5>' + usd_price + '<strong> $</strong></h5><h5>' + ils_price + '<strong> ₪</strong></h5></div></div>'


        },
        error: function () {
            var modal = document.getElementById("myModal");
            modal.style.display = "block";

            var message = '<div class="container"><p class="text-center">No connection!</p></div > ';
            $('.modal-content').html(message);
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    closeModal();
                }

            };
        },
        complete: function () {
            $('#inforow_' + getId).html(string);
            $('#' + getId).text('Close info');
            $('#' + getId).attr({
                onclick: 'clearInfo(this.id)'
            });
            clearInterval(i);
            $('#progressrow_' + getId).empty();
        }
    });
}

function clearInfo(id) {
    $('#' + id).text('More info');
    $('#' + id).attr({
        onclick: 'moreInfo(this.id)'
    });
    $('#inforow_' + id).empty();
}

function createCard(symbol, name, id) {
    var string = '<div class="card col-sm-4 box-shaded" name="' + name + '" id="container_' + symbol + '">';
    string += '<div class="row justify-content-between name=""><div class="container col"><h2>' + symbol + '</h2>';
    string += '</div><div class="custom-control custom-switch"><div class="checkbox checkbox-slider--b-flat checkbox-slider-md">';
    string += '<label><input type="checkbox"  onchange="handleSwitch(this, this.name)" name="' + id + '" id="checkbox_' + id + '"><span></span></label></div></div></div>';
    string += '<div><p class="fullname">' + name + '</p></div><div class="row info" id="progressrow_' + id + '"></div><div class="row info" id="inforow_' + id + '"></div>';
    string += '<div class="text-center"><button type="button" class="btn btn-outline-secondary box-shaded" onclick="moreInfo(this.id)" id="' + id + '">More info</button></div></div>';
    $('.for_insert').append(string);

}

function createSearchCard(symbol, name, id) {

    var string = '<div class="card col-sm-4 box-shaded" name="' + id + '" id="container_' + symbol + '">';
    string += '<div class="row justify-content-between name="' + id + '"><div class="container col"><h2>' + symbol + '</h2>';
    string += '</div><div class="custom-control custom-switch"><div class="checkbox checkbox-slider--b-flat checkbox-slider-md">';
    string += '<label><input type="checkbox"  onchange="handleSwitch(this, this.name)" name="' + id + '" id="checkbox_' + id + '"><span></span></label></div></div></div>';
    string += '<div><p class="fullname">' + name + '</p></div><div class="row info" id="inforow_' + id + '"></div>';
    string += '<div class="container text-center"><button type="button" class="btn btn-outline-secondary box-shaded" onclick="moreInfo(this.id)" id="' + id + '">More info</button></div></div>';
    $('.for_insert').empty();
    $('.for_insert').append(string);

}


function createMiniCards() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var header = '<h5 class="text-center"><strong>Live reports can be produced for&nbsp;5&nbsp;coins&nbsp;only.</br>Please review your choices.</strong></h5>';
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
        var string = '<div class="container col-sm-10 box-shaded">';
        string += '<div class="row d-flex align-items-center justify-content-between"><div class="container col"><p>' + symbol + '</p>';
        string += '</div><div class="custom-control custom-switch"><div class="checkbox checkbox-slider--b-flat checkbox-slider-md">';
        string += '<label><input type="checkbox" checked onchange="handleSwitch(this, this.name)" name="' + id + '" id="minicheckbox_' + id + '"><span></span></label></div></div></div>';

        $('.modal-content').append(string);
    }
    var button = '<div class="container text-center"><button type="button" class="btn btn-outline-secondary box-shaded" onClick="closeModal()">Save an close</button></div>';
    $('.modal-content').append(button);
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "block";

        }

    }

}

function closeModal() {
    $('.modal-content').empty();;
    modal.style.display = "block";

}


function aboutMe() {
    var string = '<div class="container col-sm-4 text-center box-shaded"><h3 class="text-center"><strong>Alexander Bruder</strong></h3>';
    string += '<div class="container col-sm-6 text-center"><img class="box-shaded img-fluid" src="img/Me.jpg"></div><h4>Full-Stack Dev</h4>';
    string += '<p><strong>Contacts:</strong></p><p>Mobile: <a href="tel:+972548887511">+972548887511</a></p><p>E-mail: <a class="text-center" href="mailto:nive.bald.man@gmail.com">nice.bald.man@gmail.com</a></p>';
    $('.for_insert').empty();
    $('.for_insert').append(string);

}

function handleSwitch(checkbox, checkedCoin) {

    if (checkbox.checked == true) {
        var counter = localStorage.length + 1;
        if (counter > 5) {
            setSwitchOff(checkedCoin);
            createMiniCards();
            return;
        } else {
            setSwitchOn(checkedCoin);
            setToLocalstorage(checkedCoin);
        }



    } else {
        if ($('#checkbox_' + checkedCoin).prop("checked") == true) {
            setSwitchOff(checkedCoin);
        }
        clearFromLocalstorage(checkedCoin);
    }
}

function setSwitchOn(id) {
    if ($('#checkbox_' + id).prop("checked") == true) {
        return;
    } else {
        $('#checkbox_' + id).click();
    }

}


function setSwitchOff(getid) {
    if ($('#checkbox_' + getid).prop("checked") == true) {
        var counter = 0;
        var i = setInterval(function () {
            counter++;
            if (counter === 1) {
                clearInterval(i);
                $('#checkbox_' + getid).click();


            }
        }, 100);
    } else {
        return;
    }
}


function setToLocalstorage(id) {

    window.localStorage.setItem(id, id);
}

function clearFromLocalstorage(id) {
    window.localStorage.removeItem(id);
}

function checkLocalstorage() {
    if (localStorage.length > 0) {


        keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            
            $('#checkbox_' + localStorage.getItem(keys[i])).attr({ checked: true });
            
        }

    }
}

function liveReports() {
    if (localStorage.length == 0) {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";

        var message = '<div class="container"><h5 class="text-center">No coins chosen!</h5></div > ';
        $('.modal-content').html(message);
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                closeModal();
            }

        };
    } else {

        chartCoins();
    }

}

function closeModal() {
    var modal = document.getElementById("myModal");
    $('.modal-content').empty();
    modal.style.display = "none";

}

function coinSearcher() {
    var counter = 0;
    let value = $("#searchInput").val().toLowerCase();

    if (value == '') {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";

        var message = '<div class="container"><h5 class="text-center">Please enter id, short symbol or name of coin!</h5</div > ';
        $('.modal-content').html(message);
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                closeModal();
            }

        };
        return;
    } else {
        for (let j = 0; j < coinsArray.length; j++) {
            var element = coinsArray[j];
            if (element[0].toLowerCase() == value || element[1].toLowerCase() == value || element[2].toLowerCase() == value) {
                var id = element[0];
                var name = element[1];
                var symbol = element[2];
                $('.for_insert').empty();
                createSearchCard(symbol, name, id);
                checkLocalstorage();
                counter++;

            } else {

            }
        }
    }
    if (counter == 0) {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";

        var message = '<div class="container"><h5 class="text-center">Sorry, your search returned no results!</h5></div > ';
        $('.modal-content').html(message);
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                closeModal();
            }

        };
    }
}


function chartCoins() {
    var coinsForLive = [];
    var coinsNamesForChart = [];
    keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        coinsForLive.push(localStorage.getItem(keys[i]));

    }
    for (let i = 0; i < coinsForLive.length; i++) {
        var value = coinsForLive[i];
        for (let j = 0; j < coinsArray.length; j++) {
            var element = coinsArray[j];
            if (element[0].toLowerCase() == value.toLowerCase() || element[1].toLowerCase() == value.toLowerCase() || element[2].toLowerCase() == value.toLowerCase()) {
                var name = element[1];
                var symbol = element[2];
                coinsForLive.splice(i, 1, symbol);
                coinsNamesForChart.push(name);


            }
        }

    }
    var tempURL = multyCoinsURL + coinsForLive.toString().toUpperCase() + apiKey;
    var options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Online Chart"
        },
        subtitles: [{
            text: "Coins with live data provided by server will be shown"
        }],
        axisX: {
            title: "Date and time"
        },
        axisY: {
            title: "Price in USD",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC",
            includeZero: false
        },

        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "spline",
            name: [],
            showInLegend: true,
            xValueFormatString: "sec hours",
            yValueFormatString: "$#,##0.#",

            dataPoints: []

        },
        {
            type: "spline",
            name: [],
            showInLegend: true,
            xValueFormatString: "sec hours",
            yValueFormatString: "$#,##0.#",

            dataPoints: []

        },
        {
            type: "spline",
            name: [],
            showInLegend: true,
            xValueFormatString: "sec hours",
            yValueFormatString: "$#,##0.#",

            dataPoints: []

        },
        {
            type: "spline",
            name: [],
            showInLegend: true,
            xValueFormatString: "sec hours",
            yValueFormatString: "$#,##0.#",

            dataPoints: []

        },
        {
            type: "spline",
            name: [],
            showInLegend: true,
            xValueFormatString: "sec hours",
            yValueFormatString: "$#,##0.#",

            dataPoints: []

        }

        ]
    };
    $(".for_insert").empty();
    $(".for_insert").CanvasJSChart(options);
    var chart = $(".for_insert").CanvasJSChart();
    if (coinsForLive != undefined || coinsForLive.length != 0) {
        var i = setInterval(() => {
            $.getJSON(tempURL, (res) => {
                for (let j = 0; j < coinsForLive.length; j++) {
                    if (res[coinsForLive[j].toUpperCase()] != undefined) {
                        options.data[j].name = coinsNamesForChart[j];

                        options.data[j].dataPoints.push({
                            y: res[coinsForLive[j].toUpperCase()].USD,
                            x: new Date()
                        });
                    }
                }
                chart.render();
            });
        }, 2000);
    }

    $(".mybutton").on("click", function () {
        clearTimeout(i);
    });
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
}

function filter() {
    $("#searchInput").keyup(function () {
        let value = $(this).val().toLowerCase();
        $("#for_insert .card").filter(function () {
            $(this).toggle($(this).attr('name').toLowerCase().indexOf(value) > -1);
        });
    });
        
    
    
}