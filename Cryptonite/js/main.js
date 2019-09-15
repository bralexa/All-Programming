const all_coins_url = 'https://api.coingecko.com/api/v3/coins/list';
const single_coin_url = 'https://api.coingecko.com/api/v3/coins/';
const multyCoinsURL = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=';
const apiKey = '&tsyms=USD&api_key=5eb33644f883867df9a7bbfa198466834a89e30b0f477d87a36e5d8e7b481d42';
var coinsForLive = [];
var values = [];
var viewArray = [];
var coinsArray = [];

$(document).ready(function () { //מייצר ראש הדף
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
function getCoins() { // מייצר רשימת מטבעות. מייצר 2 מערכים שבתוכם שומר רשימה כולה לחיפוס מתקדם ורשימה של 100 לדף ראשי. בודק אם נשמר משהוא בלוקלסטורג׳. במקרא של ניטוק מציג הודעה.
    $('.for_insert').empty();

    var counter = 0;
    var i = setInterval(function () {// מייצר פרוגרס בר 

        var percent = '<div class="card box-shaded" id="overallProgress"><h4 class="text-center">Loading coins...   ' + counter + '%</h4><div class="box progress" style="height: 2rem;"><div class="progress-bar progress-bar-striped progress-bar-animated" style="width:' + counter + '%; height: 100%;"></div></div></div>';
        $('.forprogress-bar').html(percent);
        counter++;
        if (counter === 100) {
            clearInterval(i);
            var message = '<div class="card box-shaded" id="overallProgress"><h4 class="text-center">Still waiting....</h4><div class="box progress" style="height: 2rem;"><div class="progress-bar progress-bar-striped progress-bar-animated" style="width:100%; height: 100%;"></div></div></div>';
            $('.forprogress-bar').html(message);
        }
    }, 30);
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
function moreInfo(id) {//מייצר מידה נוספת באת בקשתה. שומר לססיאונסטורג׳ ל2 דקות ומציג מסטורג׳ בפעם נוספת 
    var singe_url = single_coin_url + id;
    var counter = 0;
    var i = setInterval(function () {// מייצר פרוגרס בר 
        var percent = '<div class="container"><div class="progress"><div class="progress-bar progress-bar-striped progress - bar - animated" style="width:' + counter + '%;"></div></div></div>';
        $('#progressrow_' + id).html(percent);
        counter++;
        if (counter === 100) {
            clearInterval(i);
            var message = '<div class="container"><div class="progress"><div class="progress-bar progress-bar-striped progress - bar - animated" style="width:' + counter + '%;">Still waiting...</div></div></div>';
            $('#progressrow_' + id).html(message);

        }
    }, 40);

    if (checkSessionStorage(id)) {
        var string = '<div class="container box-shaded col d-flex align-items-center justify-content-between><div class="container col"><img src = "' + window.sessionStorage.getItem(id)[0] + '" class="logo-img" ></div><div class="container box-shaded col moreinfo text-center"><p><strong>Price:</strong></p><h5>' + window.sessionStorage.getItem(id)[2] + '<strong> €</strong></h5><h5>' + window.sessionStorage.getItem(id)[1] + '<strong> $</strong></h5><h5>' + window.sessionStorage.getItem(id)[3] + '<strong> ₪</strong></h5></div></div>'
        $('#inforow_' + id).html(string);
        $('#' + id).text('Close info');
        $('#' + id).attr({
            onclick: 'clearInfo(this.id)'
        });
        clearInterval(i);
        $('#progressrow_' + id).empty();

    } else {
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: singe_url,
            async: true,
            success: function (data) {//מחירים במקראים שהם פחות מ1 מוצגים רק עם 4 ספרות אחרי נקודה
                var image_url = data.image.large;
                var usd_price = data.market_data.current_price.usd;
                if (usd_price < 1)
                    usd_price = usd_price.toFixed(4);
                var eur_price = data.market_data.current_price.eur;
                if (eur_price < 1)
                    eur_price = eur_price.toFixed(4);
                var ils_price = data.market_data.current_price.ils;
                if (ils_price < 1)
                    ils_price = ils_price.toFixed(4);
                string = '<div class="container box-shaded col d-flex align-items-center justify-content-between><div class="container col"><img src = "' + image_url + '" class="logo-img" ></div><div class="container box-shaded col moreinfo text-center"><p><strong>Price:</strong></p><h5>' + eur_price + '<strong> €</strong></h5><h5>' + usd_price + '<strong> $</strong></h5><h5>' + ils_price + '<strong> ₪</strong></h5></div></div>';
                window.sessionStorage.setItem(id, [image_url, usd_price, eur_price, ils_price]);
                setTimeout(function () {
                    window.sessionStorage.removeItem(id);
                }, 120000);

            },
            error: function () {//הודעה עם אין חיבור
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
                $('#inforow_' + id).html(string);
                $('#' + id).text('Close info');
                $('#' + id).attr({
                    onclick: 'clearInfo(this.id)'
                });
                clearInterval(i);
                $('#progressrow_' + id).empty();
            }
        });
    }
}
function clearInfo(id) {//מוחק מידע נוספת מהקרטיסיה
    $('#' + id).text('More info');
    $('#' + id).attr({
        onclick: 'moreInfo(this.id)'
    });
    $('#inforow_' + id).empty();
}
function createCard(symbol, name, id) {//מייצר קרטיסיה של מטבעה
    var string = '<div class="card col-sm-4 box-shaded" name="' + name + '" id="container_' + symbol + '">';
    string += '<div class="row justify-content-between name=""><div class="container col"><h2>' + symbol + '</h2>';
    string += '</div><div class="custom-control custom-switch"><div class="checkbox checkbox-slider--b-flat checkbox-slider-md">';
    string += '<label><input type="checkbox"  onchange="handleSwitch(this, this.name)" name="' + id + '" id="checkbox_' + id + '"><span></span></label></div></div></div>';
    string += '<div><p class="fullname">' + name + '</p></div><div class="row info" id="progressrow_' + id + '"></div><div class="row info" id="inforow_' + id + '"></div>';
    string += '<div class="text-center"><button type="button" class="btn btn-outline-secondary box-shaded" onclick="moreInfo(this.id)" id="' + id + '">More info</button></div></div>';
    $('.for_insert').append(string);

}
function createSearchCard(symbol, name, id) {//מייצר קרטיסיה במקרה של חיפוס בכלל המטבעות

    var string = '<div class="card col-sm-4 box-shaded" name="' + id + '" id="container_' + symbol + '">';
    string += '<div class="row justify-content-between name="' + id + '"><div class="container col"><h2>' + symbol + '</h2>';
    string += '</div><div class="custom-control custom-switch"><div class="checkbox checkbox-slider--b-flat checkbox-slider-md">';
    string += '<label><input type="checkbox"  onchange="handleSwitch(this, this.name)" name="' + id + '" id="checkbox_' + id + '"><span></span></label></div></div></div>';
    string += '<div><p class="fullname">' + name + '</p></div><div class="row info" id="inforow_' + id + '"></div>';
    string += '<div class="container text-center"><button type="button" class="btn btn-outline-secondary box-shaded" onclick="moreInfo(this.id)" id="' + id + '">More info</button></div></div>';
    $('.for_insert').empty();
    $('.for_insert').append(string);

}
function createMiniCards() {//מייצר חלון עם שמות של מטבעות וכפתורים להסרתם. עובד בסנכרון עם דפ ראשי ולוקלסטורג׳ איפה מטבעות שנבחרו נשמרים
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
function closeModal() {//סוגר חלון מודל 
    $('.modal-content').empty();
    modal.style.display = "block";

}
function aboutMe() {//מייצר כרטיסיה עם מידה עבורי
    var string = '<div class="container col-sm-6 align-items-center box-shaded"><div class="container"><h3 class="text-center"><strong>Alexander Bruder</strong></h3>';
    string += '<div class="container col-sm-6 text-center"><img class="box-shaded img-fluid" src="img/Me.jpg"></div><h5 class="text-center">Full-Stack Dev</h5>';
    string += '<div class="card-header box-shaded"><h6 class="text-center"><strong>Contact me:</strong></h6><p class="card text-center">Mobile:</br><a href="tel:+972548887511">+972548887511</a></p><p class="card text-center">E-mail:</br><a class="text-center" href="mailto:nive.bald.man@gmail.com">nice.bald.man@gmail.com</a></p></div></div></div>';
    $('.for_insert').empty();
    $('.for_insert').append(string);
    $('html, body, .parallax').animate({
        scrollTop: 0
    });

}
function handleSwitch(checkbox, checkedCoin) {//במקרא של בחירת המטבעה בודק תנאים ושמר בלוקלסטורג׳ או מוחק ממנו

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
function setSwitchOn(id) {//כפתור במצב ON
    if ($('#checkbox_' + id).prop("checked") == true) {
        return;
    } else {
        $('#checkbox_' + id).click();
    }

}
function setSwitchOff(id) {//כפתור במצב OFF
    if ($('#checkbox_' + id).prop("checked") == true) {
        var counter = 0;
        var i = setInterval(function () {
            counter++;
            if (counter === 1) {
                clearInterval(i);
                $('#checkbox_' + id).click();


            }
        }, 100);
    } else {
        return;
    }
}
function setToLocalstorage(id) {//שמירה בלוקלסטורג׳

    window.localStorage.setItem(id, id);
}
function clearFromLocalstorage(id) {//מחיקה מהלוקלסטורג׳
    window.localStorage.removeItem(id);
}
function checkSessionStorage(id) {//בודק אם מידה עבור מטבעה עדיין נמצאת בססיונסטורג׳
    if (sessionStorage.length > 0) {
        keys = Object.keys(localStorage),
            i = keys.length;
        for (i; i > 0; i--) {
            if (sessionStorage.getItem(keys[i]) == id) {
                return true;
            } else {
                return false;
            }
        }

    }
}
function checkLocalstorage() {//בודק לוקלסטורג׳ לאחר שמטבעות הוצגו ומזיז את הכפתורים של המטבעות שנבחרו
    if (localStorage.length > 0) {


        keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {

            $('#checkbox_' + localStorage.getItem(keys[i])).attr({ checked: true });

        }

    }
}
function liveReports() {//בודק אם נבחרו יותר מ5 מטבעות. אם כן קורא לחלון מטבעות לבחירה. אם לא עובר להצגת גרף
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
function closeModal() {//סגירת חלון מודל
    var modal = document.getElementById("myModal");
    $('.modal-content').empty();
    modal.style.display = "none";

}
function coinSearcher() {//חיפוס מטבעה בלחיצת כפתור במערך כללי של המטבעות לפי שם או סימן או מזהה של המטבעה ומציג אותה. במקרא שלא נמצע מציג הודעה. מחשב מצבים של חיפוס ריק.
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
function chartCoins() {//מייצר דף עם גרף מטבעות שנבחרו. מייצג רק את מטבעות שיש עבורם אינפורמציה בסרבר. בשם מטבעה מציג שם שלם שלה.
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
    $('html, body, .parallax').animate({
        scrollTop: 0
    });
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
function filter() {// עושה פילתר במטבעות שמוצגות בדף הרשי יל ידי חיפוס בשם שלהם את האותיות שמקלידים בתבת אינפוט.
    $("#searchInput").keyup(function () {
        let value = $(this).val().toLowerCase();
        $(".for_insert .card").filter(function () {
            $(this).toggle($(this).attr('name').toLowerCase().indexOf(value) > -1);
        });
    });



}