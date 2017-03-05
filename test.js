var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('certificate/server.key', 'utf8');
var certificate = fs.readFileSync('certificate/server.crt', 'utf8');
var credentials = {
        key: privateKey,
        cert: certificate
 };
var express = require('express');
var app = express();
var httpsServer = https.createServer(credentials, app);

app.get ('/' , (req,res,next) => {
    res.send("Hello in HTTPS!")
    console.log("in HTTPS");
})

app.listen(3000 , () => {
    console.log("HTTPS test port 3000.");
})
