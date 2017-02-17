'use strict';
const express       = require ('express');
const app           = require ('express')();
const form          = require('multer')();
const fs            = require('fs');
const http          = require('http');
const https         = require('https');
const bodyParser    = require ('body-parser');
const UserIncome    = require ('./abstract/user_income.js');

app.set('port', (process.env.PORT || 5000));
app.use (bodyParser.urlencoded({ extended : false }));
app.set ('view engine' , 'ejs');
app.use ('/layout' , express.static('./views/layout'))
let ReadableEstimationSaving = [];
let finalInflationRate;
app.get ('/' , (req , res , next ) => {
    res.render('pages/index', {
        ReadableEstimationSaving: null,
        finalInflationRate      : null
    });
});

app.get ( '/test' , (req , res , next) => {
    let test = new UserIncome ({ age : "25" });
    test.setDefault();
})

app.post ('/calculation' , form.single() , (req , res , next ) => {
    let estimateSavingProcess = new UserIncome (req.body);
    // console.log(parseInt(0.9));
    estimateSavingProcess.setDefault();
    let finalInflationRate = (1 - estimateSavingProcess.InflationReduction()).toFixed(2);
    console.log(finalInflationRate);
    let ReadableEstimationSaving =  estimateSavingProcess.ReadableEstimationSaving();
    res.render ('pages/index', {
        ReadableEstimationSaving : ReadableEstimationSaving,
        finalInflationRate       : finalInflationRate * 100
    });
});

app.get('/about' , (req, res, next) => {
    res.render('pages/about');
});



app.get('*', (req , res, next) => {
    res.render('pages/error_page');
})

const sslAuthentication = {
    key: fs.readFileSync('./certificate/server.key' ,'utf8'),
    cert: fs.readFileSync('certificate/server.crt' , 'utf8')
};

// const httpServer    = http.createServer(app);
// const httpsServer   = https.createServer(sslAuthentication, app);

// http.createServer(app).listen(3000, function() {
//     console.log('Express HTTP server listening on port ' + 3000);
// });
//
// https.createServer(sslAuthentication, app).listen(4000, function() {
//     console.log('Express HTTPS server listening on port ' + 4000);
// });

https.createServer(sslAuthentication, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);

// app.listen(app.get('port') , () => {
//     console.log ('Server is running on port : ', app.get('port'));
//     console.log(sslAuthentication.key.toString());
//     console.log(sslAuthentication.cert);
// });
