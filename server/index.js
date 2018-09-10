const express = require('express');
const logger = require('./logger');
const db = require('./config/db');
const argv = require('./argv');
const port = require('./port');
var url = require('url');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
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
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
// app.get('/api/account-api', (req, res) => {
//   console.log('res', res);
//   console.log('!!!!!!!req', req.url);
//   var q = url.parse("https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=YourApiKeyToken", true).query;
//   console.log('Query', q, q.address);
//   res.json({ q });
// // var txt = q.year + " " + q.month;
//   res.end();
// });
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
  db.sync();
});


app.post('/api/hello', (req, res) => {
  res.send({ message: 'Hello From Express' });
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  console.log('port!!!!!', port);
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    console.log('*****', port, prettyHost);
    logger.appStarted(port, prettyHost);
  }
});
