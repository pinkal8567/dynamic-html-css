const express = require('express');
const bodyParser=require('body-parser');
const fs = require('fs'),
    path = require('path');
    const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers',"content-type, cache,X-Custom-header,acesstoken");
    res.header("AccessControlAllowMethods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin,Access-Control-Expose-Headers, X-Requested-With, Content-Type, Accept,acesstoken");
    next();
  });
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/getPage', async (req, res) => {
    let x = new Promise((resolve, reject) =>{
        fs.readFile(path.join(__dirname, 'data/test.html'), {encoding: 'utf-8'}, (err,data) => {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
            }
        });
    })
    let y = new Promise((resolve, reject) =>{
        fs.readFile(path.join(__dirname, 'data/test.css'), {encoding: 'utf-8'}, (err,data) => {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
            }
        });
    })
    x.then((html) => {
        y.then((css) => {
            res.json({htmlData: html, cssData: css});
        })
    })
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});