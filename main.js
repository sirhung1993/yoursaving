'use strict';
const app = require ('express')();
const form = require('multer')();
const bodyParser = require ('body-parser');

app.use (bodyParser.urlencoded({ extended : false }));
app.set ('view engine' , 'ejs');

app.get ('/' , (req , res , next ) => {
        console.log("GET");
    res.render ('pages/index');
});

app.post ('/calculation' , form.single() , (req , res , next ) => {
    let userInput = req.body;
    let yourSaving = userInput.monthSalary;
  //   { age: '',
  //    monthSalary: '',
  // salaryIncrement: '',
  // fixCost: '',
  // fixCostIncrement: '',
  // bankInterest: '',
  // inflationRate: '',
  // calculationDuration: '',
  // typeOfFormat: 'year' }
    for (let i = 0)
    console.log(yourSaving);
});

app.get('/about' , (req, res, next) => {
    res.render('pages/about');
});
//
app.listen('2345' , () => {
    console.log ("Server is running at port 2345");
});
