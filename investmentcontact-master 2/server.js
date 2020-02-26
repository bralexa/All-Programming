const express = require('express');
const app = express();
const cors = require('cors');

const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const PORT = process.env.PORT||3000;

app.use(cors())
app.use(express.static('client'));
app.get('/thirtyFive',(req,res)=>{

    fetch('https://www.bizportal.co.il/capitalmarket/indices/performance/33343333')
    .then(res => res.text())
    .then(body => {
         const resDom = new JSDOM(body);
         let thirtyFive = resDom.window.document.querySelectorAll('.statistics-container ul .num')[4].textContent;

         res.send(thirtyFive);
    });
})

app.get('/hundred',(req,res)=>{
    fetch('https://www.bizportal.co.il/capitalmarket/indices/generalview/33333333')
    .then(res =>res.text())
    .then(body => {
         const resDom = new JSDOM(body);
         let hundred = resDom.window.document.querySelectorAll('.statistics-container ul .num')[4].textContent;

         res.send(hundred);
    })
});

app.get('/allShare',(req,res)=>{
    fetch('https://www.bizportal.co.il/capitalmarket/indices/generalview/523')
    .then(res =>res.text())
    .then(body => {
         const resDom = new JSDOM(body);
         let allShare = resDom.window.document.querySelectorAll('.statistics-container ul .num')[4].textContent;

         res.send(allShare);
         console.log(allShare)
    })
});

app.listen(PORT, ()=>console.log(`listening on port ${PORT}...`));
