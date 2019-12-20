const functions = require('firebase-functions');
var Request = require("request");

exports.getDataFromApi = functions.https.onRequest(async (req, res) => {
  Request.get({
    "headers": { "content-type": "application/json" , "Access-Control-Allow-Origin": "*"},
    "url": "https://api.binance.com/api/v3/ticker/price?symbol=FTMUSDT",
  }, (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
      console.dir(JSON.parse(body));
      res.status(200).json({ body });
      return response.status;
  });
});