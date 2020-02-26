var express = require('express');
var mysql = require('mysql');

var app = express();

//+++
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//+++

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});

con.connect((err) => {
    if (err) {
        console.log("Can not connect to DB");
        console.log(err);

        return;
    }
    console.log('Connected');
});
app.use(express.static('dist/homeMembersTodoList'));

app.get('/familyMember', (req, res) => {
    con.query(`select * from familyMembers`, (err, rows) => {
        if (err)
            console.log(err);
        else
            console.log(rows);
        res.send(rows);
    });
});

app.get('/task', (req, res) => {
    con.query(`SELECT tasks.taskId , tasks.description, tasks.date , familymembers.nickname
    from tasks , familymembers
    where tasks.familyMemberId = familymembers.familyMemberId`, (err, rows) => {
        if (err)
            console.log(err);
        else
            console.log(rows);
        res.send(rows);
    });
});

app.post('/task', (req,res)=> {
    console.log(req.body);
    con.query(`insert into tasks ( description, familyMemberId) values ('${req.body.description}' , ${req.body.fMemberId})`,
        (err, data) => {
            if (err) {
                console.log(err);
                res.send(400, err);
            }
            else {
                console.log(data);
                res.send(data);
            }
        });
});


//SELECT gearType, ownership.ownerId FROM cars JOIN ownership WHERE cars.licenceId=ownership.licenceId
app.get('*' , (req, res) => {
    res.sendFile('index.html', {root:'dist/homeMembersTodoList'});
    })

app.listen(8080, () => {
    console.log('8080 is ready');
});
