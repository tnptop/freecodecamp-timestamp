// server.js
// where your node app starts

// init project
var dayjs = require('dayjs');
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:date', (request, response) => {
  const { date } = request.params;
  const isValidUnix = dayjs(parseInt(date)).isValid();
  const isValidNatural = dayjs(date).isValid();
  let unix = date, natural = date;
  
  if (isValidUnix) {
    natural = dayjs(parseInt(date)).format('MMMM D, YYYY');
  } else if (isValidNatural) {
    unix = dayjs(date).valueOf();
  } else {
    unix = null;
    natural = null;
  }
  
  response.json({ unix, natural });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});