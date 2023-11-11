// const { application } = require('express');
// const express = require('express');
// const sql = require('mysql2');
// const db = require('../database');

// const router = express.Router();

// //create plant table
// router.get('/planttable', (req, res) => {
//     let sql = 'CREATE TABLE plant(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//             console.log(result);
//             res.send('Plant created...');
//     });
// })

// router.get('/machinetable', (req, res) => {
//     let sql = 'CREATE TABLE machine(id int AUTO_INCREMENT, topic VARCHAR(255), name VARCHAR(255), PRIMARY KEY(id))';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//             console.log(result);
//             res.send('Machine created..');
//     });
// })

// module.exports = router;
