
const config =  {
    apiKey: "AIzaSyDYCI6Tpoq9Zh-sTJXC_KDqKQv8BnmrrNk",
    authDomain: "investmentcontact.firebaseapp.com",
    databaseURL: "https://investmentcontact.firebaseio.com",
    projectId: "investmentcontact",
    storageBucket: "investmentcontact.appspot.com",
    messagingSenderId: "401201315552",
};

firebase.initializeApp(config);

document.querySelector("#contactForm").addEventListener("submit", function (e) {
    e.preventDefault()
    let inputs = document.querySelectorAll('#contactForm input');

    userData = {
        //TODO try uniq id-or restrick if id exist
        name: inputs[2].value,
        phone: inputs[1].value,
        email: inputs[0].value,
        comment: inputs[3].value
    }

    send(e,userData)

})

function send(e,data) {
    var db = firebase.firestore();
    document.querySelector('#contactForm button').innerHTML= "sending...";

    db.collection("suersForContact").add(data)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            if(docRef.id){
                document.querySelector('body').innerHTML = "<div class='container text - center'><img src = 'eva.png'><div class='headermessage'><h3>פרטיך נשלחו בהצלחה</h3><h3>אחד מיועצינו יצור איתך קשר בהקדם</h3></div></div >"
            }
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            document.querySelector('body').innerHTML+="<h3>error, please check your connection and try again</h3>"
        });

}