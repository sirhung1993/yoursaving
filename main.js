'use strict'
const express = require('express')
const app = require('express')()
const form = require('multer')()
const bodyParser = require('body-parser')
const UserIncome = require('./abstract/user_income.js')
// const Config = require('./config/Config.js')
// const fs = require('fs')
// const http = require('http')
// const https         = require('https')
// let ServerConfiguration = new Config('DEV')

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use('/layout', express.static('./views/layout'))
// let ReadableEstimationSaving = []
// let finalInflationRate
app.get('/', (req, res, next) => {
  res.render('pages/index', {
    ReadableEstimationSaving: null,
    finalInflationRate: null
  })
})

app.post('/calculation', form.single(), (req, res, next) => {
  let estimateSavingProcess = new UserIncome(req.body)
    // console.log(parseInt(0.9))
  estimateSavingProcess.setDefault()
  let finalInflationRate = (1 - estimateSavingProcess.InflationReduction())
  let totalAsset = estimateSavingProcess.EstimationSaving()
  let ReadableEstimationSaving = estimateSavingProcess.ReadableEstimationSaving(totalAsset)
  let losingMoney = totalAsset[totalAsset.length - 1] * finalInflationRate
  let losingMoneyReadable = estimateSavingProcess.ReadableEstimationSaving(losingMoney)
  res.render('pages/index', {
    ReadableEstimationSaving: ReadableEstimationSaving,
    finalInflationRate: (finalInflationRate * 100).toFixed(2),
    losingMoneyReadable: losingMoneyReadable
  })
})

app.get('/about', (req, res, next) => {
  res.render('pages/about')
})

app.get('*', (req, res, next) => {
  res.render('pages/error_page')
})

app.listen(app.get('port'), () => {
  console.log('Server is running on port : ', app.get('port'))
})
