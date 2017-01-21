'use strict';
const express       = require ('express');
const app           = require ('express')();
const form          = require('multer')();
const bodyParser    = require ('body-parser');
const UserIncome    = require ('./abstract/user_income.js')

app.use (bodyParser.urlencoded({ extended : false }));
app.set ('view engine' , 'ejs');
app.use ('/layout' , express.static('./views/layout'))
let ReadableEstimationSaving = [];
app.get ('/' , (req , res , next ) => {
    res.render('pages/index', {
        ReadableEstimationSaving: ReadableEstimationSaving

    });
});

app.post ('/calculation' , form.single() , (req , res , next ) => {
    let estimateSavingProcess = new UserIncome (req.body);
    // console.log(parseInt(0.9));
    let ReadableEstimationSaving =  estimateSavingProcess.ReadableEstimationSaving();
    res.render ('pages/index', {
        ReadableEstimationSaving : ReadableEstimationSaving
    });
});

app.get('/about' , (req, res, next) => {
    res.render('pages/about');
});



app.get('*', (req , res, next) => {
    res.render('pages/error_page');
})

app.listen('2345' , () => {
    console.log ("Server is running at port 2345");
});
