'use strict';
const app           = require ('express')();
const form          = require('multer')();
const bodyParser    = require ('body-parser');
const UserIncome    = require ('./abstract/user_income.js')

app.use (bodyParser.urlencoded({ extended : false }));
app.set ('view engine' , 'ejs');

app.get ('/' , (req , res , next ) => {
    res.render ('pages/index');
});

app.post ('/calculation' , form.single() , (req , res , next ) => {
    let estimateSavingProcess = new UserIncome (req.body);

    estimateSavingProcess.EstimationSaving();
});

app.get('/about' , (req, res, next) => {
    res.render('pages/about');
});
//
app.listen('2345' , () => {
    console.log ("Server is running at port 2345");
});
