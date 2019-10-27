//variables
const apiId = '7a330d30a698e17be279ad095370f739'; //my key
var arr = [];
var name = '';
//download page and Home
$(document).ready(function () {
    //day of the week
    for (let j = 1; j < 5; j++) {
        let d = new Date();
        d.setDate(d.getDate() + j);
        $('#day' + j + ' .weekDay').text(d.toLocaleString("en-US", { weekday: 'long' }));
    }
    getApi("Tel Aviv");
    futureWeather("Tel Aviv");
});
//current temp by city name
$('#search').on('click', function () {
    let city = $('#inp').val();
    getApi(city);
    futureWeather(city);
    $('#inp').val("");
});
const getApi = async (selectedCity) => {
    const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + selectedCity
        + '&units=metric&appid=' + apiId);
    const cityWeather = await res.json();
    $('#current #cityName').text(cityWeather.name.toUpperCase());
    $('#current .dayTemp').text(cityWeather.main.temp.toFixed(0));
    let tempIdentification='sunny';
    tempIdentification=cityWeather.weather[0].main.toLowerCase();
    if(tempIdentification=='clouds'){
        tempIdentification='cloudy'
    }
    if(tempIdentification=='clear'){
        tempIdentification='sunny'
    }
    $('#current #sunnyRainy').text(tempIdentification);
    return cityWeather;
}
//forecast weather
const getHisApi = async (selectedCity) => {
    const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='
        + selectedCity
        + '&units=metric&appid=' + apiId);
    const cityWeather = await res.json();
    return cityWeather.list;
}
const futureWeather = async (selectedCity) => {
    arr = await getHisApi(selectedCity);
    console.log(arr);
    let i = 0;
    let arrDate = arr[i].dt_txt.split(' ')[0];
    arrDate = arrDate.split('-')[2];
    let tomorrow = new Date().getDate() + 1;
    while (arrDate != tomorrow) {
        i++;
        arrDate = arr[i].dt_txt.split(' ')[0];
        arrDate = arrDate.split('-')[2];
    }
    let inx = 1;
    for (i=i+1; i < arr.length; i++) {
        arrDate = arr[i].dt_txt.split(' ')[1];
        arrDate = arrDate.split(':')[0];
        if (arrDate == '12') {
            $('#day' + inx + ' .dayTemp').text(arr[i].main.temp.toFixed(0));
            let tempIdentification='sunny';
            tempIdentification=arr[i].weather[0].main.toLowerCase();
            if(tempIdentification=='clouds'){
                tempIdentification='cloudy'
            }
            if(tempIdentification=='clear'){
                tempIdentification='sunny'
            }
            $('#day' + inx + ' i').removeClass().addClass('wi wi-day-'+tempIdentification);
            console.log('wi-day-'+arr[i].weather[0].main.toLowerCase());
        }
        if (arrDate == '00') {
            $('#day' + inx + ' .nightTemp').html(arr[i].main.temp.toFixed(0));
            inx++;
        }
    }
}