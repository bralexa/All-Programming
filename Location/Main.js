if (localStorage.getItem('0')) {
    document.getElementById("form").innerHTML = " ";
} else {
    document.getElementById("submit").addEventListener("click", setTolocalStorage);
    function setTolocalStorage() {
        named = namer.value;
        console.log(named);
        if (document.getElementById("checkbox").checked) {
            localStorage.setItem('0', named);
            sessionStorage.setItem('0', named);
        } else {
            sessionStorage.setItem('0', named);
        }
    }
}





