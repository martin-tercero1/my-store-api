const express = require('express');
const routerApi = require('./routes');
const {
  errorLogger,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8016;

app.use(express.json());


app.get('/api', (req, res) => {
  res.send('Server');
});

app.get('/api/home', (req, res) => {
  res.send('Server');
});

routerApi(app);

const whitelist = [
  'http://localhost:8016',
  'https://martin-tercero.com',
  'https://my-store-api-git-main-martin-terceros-projects.vercel.app',
  'https://my-store-api-martin-terceros-projects.vercel.app',
  'https://my-store-api-seven.vercel.app',
];
const options = {
  origin: (origin, callback) => {
    console.log(origin)
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  },
};
app.use(cors(options));
// Error middlewares should be defined after the routing
// Also the order of execution is the order of declaration
app.use(errorLogger);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
