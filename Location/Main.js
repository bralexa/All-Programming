if(localStorage.getItem('0')){
    return;
}else {
    document.getElementById("form").innerHTML="  "
}

document.getElementById("submit").addEventListener("click", setTolocalStorage);
function setTolocalStorage() {
    named = namer.value;
    console.log(named);
    if(document.getElementById("checkbox").checked){
        if(localStorage.getItem('0')){
            return;
        }else{
            localStorage.setItem('0',named);
        }
        
    }else{
        sessionStorage.setItem('0',named)
    }
    
    
    
}



