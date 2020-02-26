let resList = {};

function init() {
    callApi();
}
init();

function startCalc() {
    userVal = document.getElementById('amountInput').value;
    if (resList.allShare) {
        calcResults(Number(userVal), resList);
    } else {
        setTimeout(() => {
            startCalc();
            console.log('start again')
        }, 500)
    }
}

document.getElementById('calcBtn').addEventListener('click', () => {
    startCalc();
});

function callApi() {
    fetch('thirtyFive')
        .then((res) => {
            return res = res.text();
        })
        .then((thirtyFive) => {
            resList.thirtyFive = parseFloat(thirtyFive);

            fetch('hundred')
                .then((res) => {
                    return res = res.text();
                })
                .then((hundred) => {
                    resList.hundred = parseFloat(hundred);

                    fetch('allShare')
                        .then((res) => {
                            return res = res.text();
                        })
                        .then((allShare) => {
                            resList.allShare = parseFloat(allShare);
                            console.log(resList)
                        })
                })
        })
}

function calcResults(userVal, fromApi) {
    let aResult = userVal + ((userVal / 100) * fromApi.thirtyFive);
    let bResult = userVal + ((userVal / 100) * fromApi.hundred);
    let cResult = userVal + ((userVal / 100) * fromApi.allShare);

    results = [aResult, bResult, cResult]
    displayRes(results);

}

function displayRes(results) {
    document.querySelector('#resultsArea').style.display = 'block';
    let divs = document.querySelectorAll('.resultDiv');
    for (i = 0; i < divs.length; i++) {
        divs[i].innerHTML = `<h4 dir="rtl" class="text-center">שווי צפוי לאחר שנה: ${(results[i]).toFixed(2)} אלף ש״ח</h4>`
    }
    // <br> <p>3 month: ${(results[i] * 3).toFixed(2)}</p><br> <p> 6 month: ${(results[i] * 6).toFixed(2)}</p>
}
