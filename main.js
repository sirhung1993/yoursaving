'use strict';
const express       = require ('express');
const app           = require ('express')();
const form          = require('multer')();
const bodyParser    = require ('body-parser');
const UserIncome    = require ('./abstract/user_income.js')

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

app.listen(app.get('port') , () => {
    console.log ('Server is running on port : ', app.get('port'));
});
