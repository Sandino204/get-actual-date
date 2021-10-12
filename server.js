// server.js
// where your node app starts
const date = require("date-and-time")

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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//get Time
app.get("/api/:time", (req, res) => {
  const {time} = req.params
  const isString = isNaN(time)
  const valid = isString ? (new Date(time)).getTime() > 0 : (new Date(parseInt(time))).getTime()
  const timeDate = isString ? new Date(time) : new Date(parseInt(time))

  if(!valid){
    return res.status(200).json({
      success: false, 
      message: "Unix invalid"
    })
  }

  return res.status(200).json({
    unix: timeDate.getTime(), 
    utc: date.format(timeDate, "ddd, DD ddd YYYY HH:mm:ss " + "GMT")
  })
})



// listen for requests :)
var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
