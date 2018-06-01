var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var url = require("url");
var json = require("./comments.json");
var app = express();
const dir = path.parse(__dirname).dir;

var staticSiteOptions = {
   portnum: 8000, 
   maxAge: 1000 * 60 * 15 * 1
};

let filesArr = [];

// for parsing requests
app.use(bodyParser.json());

// recieving an array of picture names
app.post('/pictureGet', (req, res) => {

  fs.readdir(dir + '/public/image/gallery', function(err, info) {

    if (err) {
      res.status(500).send("An error occured on server")
    }

    filesArr = [];
    
    info.forEach((item) => {
      if (!(item in filesArr)) {
        filesArr.push('image/gallery/' + item);
      }
    })
    res.json(filesArr)
  });
})





app.post("/jsondata", function(req, res) {
  res.send(json);
})


// отправка файла json
app.post('/json', function (req, res) {

  let obj = json;
  let newObj = JSON.parse(JSON.stringify(req.body));

  for(let key in newObj) {

    if (!obj[key]) {
      obj[key] = [];
    }
    obj[key].push(newObj[key]);
  }

  obj = JSON.stringify(obj, null, 2);
  fs.writeFile("./backend/comments.json", obj, 'utf8', function(err, info) {
    if (err) {
      res.status(500).send("An error occured on server")
    }

    res.status(200).end(obj)
  });

})



app.use(express.static(
   path.join(dir, 'public'),
   staticSiteOptions
)).listen(staticSiteOptions.portnum);
console.log("start");