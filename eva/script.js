var numbersArray = [];
var resultsArray = [];
var finalDescision = [];
function getElements() {
    numbersArray.push(document.getElementById("a").value);
    numbersArray.push(document.getElementById("b").value);
    numbersArray.push(document.getElementById("c").value);
    numbersArray.push(document.getElementById("d").value);
    numbersArray.push(document.getElementById("e").value);
    numbersArray.push(document.getElementById("f").value);
    numbersArray.push(document.getElementById("x").value);


    if (parseFloat(numbersArray[6]) > 1 || parseFloat(numbersArray[6]) < 0 || isNaN(parseFloat(numbersArray[6]))) {
        alert("הסתברות חייבת להיות בין 0 ל1");
        clearAll();
        return;
    } else {
        var temp = parseFloat(numbersArray[6]);
        numbersArray[6] = temp;
    }

    for (i = 0; i < 6; i++) {
        if (parseFloat(numbersArray[i]) < 0) {
            console.log(numbersArray[i]);
            var temp = parseFloat(numbersArray[i]);
            temp = temp * (-1);
            numbersArray[i] = temp;

        } else {
            var temp = parseFloat(numbersArray[i]);
            numbersArray[i] = temp;
        }

    }
    mathematics(numbersArray);

}

function mathematics(numbersArray) {

    var x = numbersArray[6];
    checkOptionOne();


    function checkOptions(a, b, x, option) {
        var result = (x * a) + ((1 - x) * b * (-1));
        resultsArray[option] = result;
    }

    function checkOptionOne() {
        var a = numbersArray[0];
        var b = numbersArray[1];
        var option = 1;
        if (isNaN(a)) {
            a = 0;
        }
        if (isNaN(b)) {
            b = 0;
        }
        checkOptions(a, b, x, option);
        checkOptionTwo();



    }

    function checkOptionTwo() {
        var a = numbersArray[2];
        var b = numbersArray[3];
        var option = 2;
        if (isNaN(a)) {
            a = 0;
        }
        if (isNaN(b)) {
            b = 0;
        }
        checkOptions(a, b, x, option);
        checkOptionThree();



    }

    function checkOptionThree() {
        var a = numbersArray[4];
        var b = numbersArray[5];
        var option = 3;
        if (isNaN(a)) {
            a = 0;
        }
        if (isNaN(b)) {
            b = 0;
        }
        checkOptions(a, b, x, option);



    }

    makeDescision(resultsArray);

}


function makeDescision(resultsArray) {
    if (resultsArray[1] > resultsArray[2] && resultsArray[1] > resultsArray[3]) {
        finalDescision[0] = 1;
        finalDescision[1] = resultsArray[1];
    } else {
        if (resultsArray[2]> resultsArray[1] && resultsArray[2] > resultsArray[3]) {
            finalDescision[0] = 2;
            finalDescision[1] = resultsArray[2];
        } else {
            finalDescision[0] = 3;
            finalDescision[1] = resultsArray[3];
        }
    }

    if (finalDescision[1] <= 0) {
        var message = '<h4 dir="rtl" class="text-center">לא מומלץ להשקיה באף אחת מהאופציות</h4>';
        showResult(message);
    } else {
        var message = '<h4 dir="rtl" class="text-center">תוחלת הרווח הגבוהה ' + finalDescision[1] + ' אלף ש״ח התקבלה באופציה ' + finalDescision[0];
        showResult(message)
    }
    

}

function clearAll() {
    $("input[type=number], textarea").val("");
    numbersArray = [];
    resultsArray = [];
    finalDescision = [];
}

function showResult(message) {
    $('.submitform').empty();
    $('.controlbuttons').empty();
    $('.headermessage').empty();
    var headermessage = '<h3>תוצאות חישוב ווירטואלי</h3>';
    $('.headermessage').html(headermessage);
    $('.submitform').html(message);
    var newbutton = '<div class="container col text-center"><button class="btn btn-primary reload" type = "submit" id = "reload" value="Reload Page" onclick="document.location.reload(true)"> לחישוב חדש</button ></div >';
    $('.controlbuttons').html(newbutton);

}