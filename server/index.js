const express = require('express');
const logger = require('./logger');
const db = require('./config/db');
const http = require('https');
const Request = require('request');
const argv = require('./argv');
const port = require('./port');
const Transaction = require('./models/transactions');
const url = require('url');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const resolve = require('path').resolve;
const app = express();
const fs = require('fs');
const rMyRoute = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.use(require(`${__dirname}/public`));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});
fs.readdirSync(`${__dirname}/controllers`).forEach((file) => {
  console.log(file, 'filefilefilefile');
  if (file.substr(-3) === '.js') {
    const pathToController = `${__dirname}/controllers/${file}`;
    console.log(pathToController, 'pathToController');
    router = require(pathToController)(app);
    app.use(pathToController, rMyRoute);
  }
  // db.sync();
});

app.post('/api/hello', (req, res) => {
  res.send({ message: 'Hello From Express' });
});

// In this method get data by calling third party url(etherscan url) and send response back in socket
const getEthData = (callback) => {
  Request.post(
    {
      headers: { 'content-type': 'application/json' },
      url:
        'http://api.etherscan.io/api?module=account&action=txlist&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken',
      body: JSON.stringify({
        firstname: 'Nic',
        lastname: 'Raboy',
      }),
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      if (callback) {
        callback(null, response.body);
      }
    }
  );
};

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
const server = app.listen(port, host, (err) => {
  console.log('port!!!!!', port);
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(
      port,
      (innerErr, url) => {
        if (innerErr) {
          return logger.error(innerErr);
        }

        logger.appStarted(port, prettyHost, url);
      }
    );
  } else {
    console.log('*****', port, prettyHost);
    logger.appStarted(port, prettyHost);
  }
});

// const io = require("socket.io")(server);
// io.on("connection", socket => {
//   console.log("A user connected");

//   getEthData((err, res) => {
//     if (res) {
//       insertTransactions(res);
//     }
//   });
//   //Whenever someone disconnects this piece of code executed
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// insert transaction data into database.
const insertTransactions = (res) => {
  const data = JSON.parse(res);
  for (const items of data.result) {
    Transaction.create({
      block_id: items.blockNumber,
      transaction_hash: items.hash,
      value: items.value,
      tx_fee: items.gasPrice,
      gas_used: items.gas,
      cumulative_gas_used: items.cumulativeGasUsed,
      address_from: items.from,
      address_to: items.to,
    })
      .then((result) => {
        console.log('successful!!!', result);
      })
      .catch((errr) => {
        console.log('error', errr);
      });
  }
};
