'use strict';
const app           = require ('express')();
const form          = require('multer')();
const bodyParser    = require ('body-parser');
const UserIncome    = require ('./abstract/user_income.js')

app.use (bodyParser.urlencoded({ extended : false }));
app.set ('view engine' , 'ejs');
let ReadableEstimationSaving = [];
app.get ('/' , (req , res , next ) => {
    res.render('pages/index', {
        ReadableEstimationSaving: ReadableEstimationSaving

    });
});

app.post ('/calculation' , form.single() , (req , res , next ) => {
    let estimateSavingProcess = new UserIncome (req.body);

    let ReadableEstimationSaving =  estimateSavingProcess.ReadableEstimationSaving();
    res.render ('pages/index', {
        ReadableEstimationSaving : ReadableEstimationSaving
    });
});

app.get('/about' , (req, res, next) => {
    res.render('pages/about');
});
//
app.listen('2345' , () => {
    console.log ("Server is running at port 2345");
});
