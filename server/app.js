const express = require('express');
const path = require('path');
const body = require('body-parser');
//const app = express();
const mysql = require('mysql');

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync(__dirname +'/server.key', 'utf8');
var certificate = fs.readFileSync(__dirname +'/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const app = express();

var httpsServer = https.createServer(credentials, app);

app.use(body());
app.use(express.static(path.resolve(__dirname, '..', 'build')));

const db = mysql.createConnection({
    host: '192.168.80.1',
    user: 'poom',
    password: '1234',
    database: 'testing'
});//SELECT timestamp, id, firstname, lastname, email, laptop_Name FROM users, labtop LIMIT 1;
// show data //SELECT timestamp, id, firstname, lastname, email, laptop_Name FROM users, labtop;
app.get('/data', function(req,res){
    console.log("Hello in /data ");
    let sql = 'SELECT * FROM users left join labtop on labtop.laptop_id = users.lula;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});
//show labtop
app.get('/labtop', function(req,res){
    console.log("Hello in /labtop ");
    let sql = 'SELECT * FROM labtop;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});


//delete
app.put('/delete', function(req, res) {
    var sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql,[req.body.idkey],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//edit
app.put('/data', function(req, res) {
    var sql = 'UPDATE users SET firstname= ? , lastname = ? WHERE id = ?';
    db.query(sql,[req.body.firstname,req.body.lastname,req.body.idkey],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//insert
app.post('/data', function(req, res){
    console.log(req.body);
    let data = {
      
        id:req.body.idkey,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email, // add emild
        lula:req.body.lula // ต้องใส่ 
    };
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, data, (err, result)=>{
        if(err){
            console.log(err);
            console.log("ID is Primarykey!!!!!");
            console.log("Enter the id again..");
        }else{
            console.log(result);
        }
    });
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});




//module.exports = app;
module.exports = httpsServer;
