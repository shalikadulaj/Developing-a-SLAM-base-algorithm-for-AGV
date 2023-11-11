const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { response } = require('express');
const schedule = require('node-schedule');
const mqtt = require('mqtt')

// const { createConnection } = require('mysql2/promise');
// const plantrouter = require('./routes/plant')

const app = express();

app.use(cors());
app.use(bodyParser.json());

//create mysql connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'power'
// });

// db.connect((err) => {
//     if(err){
//         throw err;
//     }
//     console.log('mysql connected');
// });

var db = mysql.createConnection ({
    host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'power',
      multipleStatements: true
  });
  
  function handleDisconnect() { 
  
    db.connect(function(err) {             
      if(err) {                                     
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }else{
          console.log('connected')
      }                                     
    });                                     
                                            
    db.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                         
      } else {                                      
        throw err;                                  
      }
    });
  }
  
  handleDisconnect();

let powerAll, powerBm1, powerBm2, powerWeb1, powerWeb2, powerWeb4, powerUv1, powerUv2, powerFolding1, powerFolding2, powerFolding3, powerFolding4, powerFolding5, powerFolding6, powerFolding7, powerFolding8, powerSb1, powerSb2, powerPb1, powerPb2, powerAutosewing1, powerSpeedMaster3, powerSpeedMaster4, powerPolarCutter, powerThreeKnife, powerShrinkPacking, powerCt, powerMsq30b, powerMsqb, powerMsq40, powerMsq30s;

//create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE power';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Database created...');
    });
});

//create branch table
app.get('/branchtable', (req, res) => {
    let sql = 'CREATE TABLE branch(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('braanch created...');
    });
})

//create plant table
app.get('/planttable', (req, res) => {
    let sql = 'CREATE TABLE plant(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Plant created...');
    });
})

//create machine table
app.get('/machinetable', (req, res) => {
    let sql = 'CREATE TABLE machine(id int AUTO_INCREMENT, topic VARCHAR(255), name VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive machine records by id
app.get('/machine/:id', (req, res) => {
    let sql = `SELECT name FROM machine WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create BM1 machine table
app.get('/BM1', (req, res) => {
    let sql = 'CREATE TABLE BM1 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive bm1 machine records by id
app.get('/bm1/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM bm1 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create BM2 machine table
app.get('/BM2', (req, res) => {
    let sql = 'CREATE TABLE BM2 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive bm2 machine records by id
app.get('/bm2/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM bm2 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create WEB1 machine table
app.get('/WEB1', (req, res) => {
    let sql = 'CREATE TABLE WEB1 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive web1 machine records by id
app.get('/web1/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM web1 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create WEB2 machine table
app.get('/WEB2', (req, res) => {
    let sql = 'CREATE TABLE WEB2 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive web2 machine records by id
app.get('/web2/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM web2 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create WEB3 machine table
app.get('/WEB3', (req, res) => {
    let sql = 'CREATE TABLE WEB3 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive web3 machine records by id
app.get('/web3/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM web3 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create WEB4 machine table
app.get('/WEB4', (req, res) => {
    let sql = 'CREATE TABLE WEB4 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive web4 machine records by id
app.get('/web4/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM web4 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create UV1 machine table
app.get('/UV1', (req, res) => {
    let sql = 'CREATE TABLE UV1 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive uv1 machine records by id
app.get('/uv1/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM uv1 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create UV2 machine table
app.get('/UV2', (req, res) => {
    let sql = 'CREATE TABLE UV2 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive uv2 machine records by id
app.get('/uv2/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM uv2 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Folding1 machine table
app.get('/folding1', (req, res) => {
    let sql = 'CREATE TABLE Folding1 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive Folding1 machine records by id
app.get('/folding1/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM folding1 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Folding2 machine table
app.get('/folding2', (req, res) => {
    let sql = 'CREATE TABLE Folding2 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive Folding2 machine records by id
app.get('/folding2/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM folding2 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Folding3 machine table
app.get('/folding3', (req, res) => {
    let sql = 'CREATE TABLE Folding3 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive Folding3 machine records by id
app.get('/folding3/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM folding3 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Folding4 machine table
app.get('/folding4', (req, res) => {
    let sql = 'CREATE TABLE Folding4 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive Folding14achine records by id
app.get('/folding4/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM folding4 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Folding5 machine table
app.get('/folding5', (req, res) => {
    let sql = 'CREATE TABLE Folding5 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive Folding5 machine records by id
app.get('/folding5/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM folding5 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Folding6 machine table
app.get('/folding6', (req, res) => {
    let sql = 'CREATE TABLE Folding6 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive Folding6 machine records by id
app.get('/folding6/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM folding6 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Folding7 machine table
app.get('/folding7', (req, res) => {
    let sql = 'CREATE TABLE Folding7 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive Folding7 machine records by id
app.get('/folding7/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM folding7 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Folding8 machine table
app.get('/folding8', (req, res) => {
    let sql = 'CREATE TABLE Folding8 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive Folding8 machine records by id
app.get('/folding8/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM folding8 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create SB1 machine table
app.get('/SB1', (req, res) => {
    let sql = 'CREATE TABLE SB1 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive sb1 machine records by id
app.get('/sb1/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM sb1 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create SB2 machine table
app.get('/SB2', (req, res) => {
    let sql = 'CREATE TABLE SB2 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive sb2 machine records by id
app.get('/sb2/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM sb2 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create PB1 machine table
app.get('/PB1', (req, res) => {
    let sql = 'CREATE TABLE PB1 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive pb1 machine records by id
app.get('/pb1/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM pb1 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create PB2 machine table
app.get('/PB2', (req, res) => {
    let sql = 'CREATE TABLE PB2 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive pb2 machine records by id
app.get('/pb2/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM pb2 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Auto Sawing1 machine table
app.get('/autoSawing1', (req, res) => {
    let sql = 'CREATE TABLE Auto_Sawing1 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive auto sewing1 machine records by id
app.get('/autoSawing1/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM auto_sewing1 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Speed Master3 machine table
app.get('/speedMaster3', (req, res) => {
    let sql = 'CREATE TABLE Speed_Master3 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive speed master3 machine records by id
app.get('/speedMaster3/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM speed_master3 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Speed Master4 machine table
app.get('/speedMaster4', (req, res) => {
    let sql = 'CREATE TABLE Speed_Master4 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive speed master4 machine records by id
app.get('/speedMaster4/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM speed_master4 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Polar Cutter machine table
app.get('/polarCutter', (req, res) => {
    let sql = 'CREATE TABLE Polar_Cutter (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive polar cutter machine records by id
app.get('/polarCutter/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM polar_cutter WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Three Knife machine table
app.get('/threeKnife', (req, res) => {
    let sql = 'CREATE TABLE Three_Knife (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive three knife machine records by id
app.get('/threeKnife/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM three_knife WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create Shrink Packing machine table
app.get('/shrinkPacking', (req, res) => {
    let sql = 'CREATE TABLE Shrink_Packing (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive shrink packing knife machine records by id
app.get('/shrinkPacking/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM shrink_packing WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create CT machine table
app.get('/CT', (req, res) => {
    let sql = 'CREATE TABLE CT (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive ct knife machine records by id
app.get('/ct/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM ct WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create MSQ-30B machine table
app.get('/MSQ-30B', (req, res) => {
    let sql = 'CREATE TABLE MSQ_30B (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive msq-30b machine records by id
app.get('/msq-30b/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM msq_30b WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create MSQ-B machine table
app.get('/MSQ-B', (req, res) => {
    let sql = 'CREATE TABLE MSQ_B (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive msq-b machine records by id
app.get('/msq-b/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM msq_b WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create MSQ-40 machine table
app.get('/MSQ-40', (req, res) => {
    let sql = 'CREATE TABLE MSQ_40 (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive msq-40 machine records by id
app.get('/msq-40/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM msq_40 WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//create MSQ-30S machine table
app.get('/MSQ-30S', (req, res) => {
    let sql = 'CREATE TABLE MSQ_30S (id int AUTO_INCREMENT, day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_main VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), offPeak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('Machine created..');
    });
})

//retrive msq-30s machine records by id
app.get('/msq-30s/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM msq_30s WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//Overall energy
app.get('/powerAllTable', (req, res) => {
    let sql = 'CREATE TABLE power_all (id int AUTO_INCREMENT, time TIMESTAMP default NOW(), offPeak_main VARCHAR(255), day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_gen VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('created..');
    });
})

//retrive overll energy records by id
app.get('/getenergy_all/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM power_all WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//Overall energy monthy
app.get('/power_all_monthly', (req, res) => {
    let sql = 'CREATE TABLE power_all_monthly (id int AUTO_INCREMENT, time TIMESTAMP default NOW(), offPeak_main VARCHAR(255), day_main VARCHAR(255), peak_main VARCHAR(255), offPeak_gen VARCHAR(255), day_gen VARCHAR(255), peak_gen VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
            console.log(result);
            res.send('created..');
    });
})

//retrive overll energy records by id
app.get('/getenergy_all_monthly/:id', (req, res) => {
    let sql = `SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM power_all_monthly WHERE id = ${req.params.id}`;
    console.log(req.params);
    db.query(sql, (err, results) => {
        if(err) throw err;
            console.log(results);
            res.send(results);
    });
})

//node schedule example
schedule.scheduleJob('00 14 12 28 12 *', () => {
        let sql = 'INSERT INTO energy_monthly(name, tariff1gen, tariff2gen, tariff3gen, tariff1main, tariff2main,  tariff3main) SELECT name, tariff1gen, tariff2gen, tariff3gen, tariff1main, tariff2main,  tariff3main  from energy_daily';
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
                console.log(result);
        })
})

//mqtt connection
var client = mqtt.connect('ws://192.168.8.110:8083/mqtt');

client.on('connect', function() {
    client.subscribe("data/power/powerdash/9999");
    client.subscribe("data/web4/web4power/0404");
    console.log("Client has subscribed")
});

client.on('message', function(topic, message){
    powerAll = JSON.parse(message.toString());
    // console.log(message);

    //update off peak reading
    schedule.scheduleJob('59 29 05 * * *', () => {
        db.connect(function(err) {
            if (err) throw err;
            let sql = `UPDATE power_all SET offPeak_main = ${powerAll.mainPowerReading} WHERE id = '1'; UPDATE web4 SET offPeak_main = ${powerAll.mainPowerReading} WHERE id = '1';`;
            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
            });
        });
    })

    //update day reading
    schedule.scheduleJob('59 59 17 * * *', () => {
        db.connect(function(err) {
            if (err) throw err;
            let sql = `UPDATE power_all SET day_main = ${powerAll.mainPowerReading} WHERE id = '1'; UPDATE web4 SET day_main = ${powerAll.mainPowerReading} WHERE id = '1';`;
            db.query(sql, function (err, result) {
              if (err) throw err;
              console.log(result.affectedRows + " record(s) updated");
            });
          });
    })

    //update peak reading
    schedule.scheduleJob('59 29 22 * * *', () => {
        db.connect(function(err) {
            if (err) throw err;
            let sql = `UPDATE power_all SET peak_main = ${powerAll.mainPowerReading} WHERE id = '1'; UPDATE web4 SET peak_main = ${powerAll.mainPowerReading} WHERE id = '1';`;
            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
            });
        });
    })
})

//update end of the january power reading
schedule.scheduleJob('59 59 23 31 1 *', () => {
    db.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO power_all_monthly (offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen) SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM power_all WHERE id='1'; INSERT INTO power_all_monthly (offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen) SELECT offPeak_main, day_main, peak_main, offPeak_gen, day_gen, peak_gen FROM web4 WHERE id='1';";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
    });
})

//update end of the february power reading
schedule.scheduleJob('59 59 23 31 1 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//update end of the march power reading
schedule.scheduleJob('59 59 23 31 03 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//update end of the april power reading
schedule.scheduleJob('59 59 23 30 04 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//update end of the may power reading
schedule.scheduleJob('59 59 23 31 05 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//update end of the june power reading
schedule.scheduleJob('59 59 23 30 06 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//update end of the july power reading
schedule.scheduleJob('59 59 23 31 07 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//update end of the august power reading
schedule.scheduleJob('59 59 23 31 08 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//update end of the september power reading
schedule.scheduleJob('59 59 23 30 09 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//update end of the october power reading
schedule.scheduleJob('59 59 23 31 10 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//update end of the november power reading
schedule.scheduleJob('59 59 23 30 11 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//update end of the december power reading
schedule.scheduleJob('59 59 23 31 12 *', () => {
    let post = {
        tariff2gen: power.mainPowerReading,
        tariff2main: '222'
    };
    let sql = 'UPDATE energy_daily SET ? WHERE id=1';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
            console.log(result);
            // res.send('Entry updated...');
    })
})

//assigns port 6000 for node server
const port =  process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`server running port ${port}`);
})

module.exports = db;