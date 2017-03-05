'use strict'
const orm = require('orm')
const Config = require('../config/Config.js')

let dbConfiguration = new Config()
orm.settings.set('properties.primary_key', false)
let db = orm.connect(dbConfiguration.dbVersion + '://' + dbConfiguration.dbUsername + ':' +
dbConfiguration.dbPassword + '@' + dbConfiguration.dbHostname +
'/' + dbConfiguration.dbDatabasename)

let dbConnected = new Promise((resolve, reject) => {
  db.on('connect', (err) => {
    if (err) {
      reject({err: {msg: 'Cannot connect Database!'}})
    } else {
      resolve()
    }
  })
})
// db.on('connect', (err) => {
//   if (err) {
//     console.log(err)
//     return Promise.reject({err: {msg: 'Cannot connect Database!'}})
//   } else {
//     return Promise.resolve()
//   }
// })
dbConnected.catch((err) => {
  console.log(err)
})
dbConnected.then(() => {
  console.log(db.settings.get('properties.primary_key'))
  let SpendingRecord = db.define('transactionRecord', {
    transactionId: Number,
    billId: Number,
    payerId: Number,
    beneficiaryId: Number,
    transferMoney: Number,
    currencyType: ['VND', 'USD'],
    transactionDate: {type: 'date', time: true}
  })
  SpendingRecord.sync((err) => {
    console.log(err)
    // let newRecord = {}
    // newRecord.billId = 1
    // newRecord.payerId = 1
    // newRecord.beneficiaryId = 1
    // SpendingRecord.create(newRecord, (err, results) => {
    //   if (err) console.log(err)
    //   else {
    //     console.log(results)
    //   }
    // })
    // console.log('In Sync')
  })
})
