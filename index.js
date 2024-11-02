// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Timestamp Microservice

function isTimestamp(value) {
  
  if (!isNaN(value)) {
    let timestamp = Number(value);
    return timestamp.toString().length === 13
  } else {
    return false;
  }

}

function isDate(value) {
 return isNaN(value) && !isNaN(Date.parse(value));
}

app.get('/api/:date?', function (req,res) {
  let dateParams = req.params.date;

  if (!dateParams) {
    let date = new Date();
    let specificDate = date.toUTCString();
    let unixTimestamp = date.getTime();
    
    res.json({"unix": unixTimestamp, "utc": `${specificDate}`});
  } else if (isDate(dateParams)) {
    let date = new Date(req.params.date);
    let specificDate = date.toUTCString();
    let unixTimestamp = date.getTime();

    res.json({"unix": unixTimestamp, "utc": `${specificDate}`});
  }  else if (isTimestamp(dateParams)) {
    let date = new Date(Number(req.params.date));
    let specificDate = date.toUTCString();
    let unixTimestamp = date.getTime();

    res.json({"unix": unixTimestamp, "utc": `${specificDate}`});
  } else {
    res.json({ error : "Invalid Date" });
  }

});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
