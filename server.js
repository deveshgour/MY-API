var express = require('express');
var mysql = require('mysql');

var app = express();

// var connection = mysql.createConnection({
  
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'sampleDB'
// });

var connection = mysql.createPool({
    connectionLimit: 50,
    host:'localhost',
    user:'root',
    password:'',
    database:'sampleDB'
});

// connection.connect(function(error){
//     if(!!error){
//         console.log('Error');
//     }else{
//         console.log('Connected');
//     }
// });

app.get('/', function(req, resp){
    //about mysql
 
    // connection.query("SELECT * FROM mySampleTable", function(error, rows, fields){
    //     //callback
    //     if(!!error){
    //         console.log('Error in query')
    //     }else{
    //         console.log('SUCESS!\n');
    //         console.log(rows[0].Name);
    //         resp.send('Hello,' + rows[0].Name);
    //         //parse with your rows/fileds
    //     }
    // });

    connection.getConnection(function(error, tempCont){
        if(!!error){
            tempCont.release();
             console.log('Error');
        }else{
            console.log('Connected!');
            tempCont.query("SELECT * FROM mySampleTable", function(error, rows, fields){
                tempCont.release(); 
                //callback
                if(!!error){
                    console.log('Error in query')
                }else{
                    console.log('SUCESS!\n');
                    console.log(rows[0].Name);
                    resp.json(rows);
                    //parse with your rows/fileds
                }
            });
        }
    });

});

app.listen(1337);