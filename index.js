const express = require('express');
const routerApi = require('./routes');
const { errorLogger, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();
const port = 8016;

app.use(express.json())

const whitelist = ['http://localhost:8080', 'https://martin-tercero.com'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed'));
    }
  }
}
app.use(cors(options))

app.get('/', (req, res) => {
  res.send('Server');
});

app.get('/home', (req, res) => {
  res.send('Server');
});

routerApi(app);

// Error middlewares should be defined after the routing
// Also the order of execution is the order of declaration
app.use(errorLogger);
app.use(boomErrorHandler)
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
