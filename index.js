const express = require('express');
const mongoose = require('mongoose');
require('./models/Users');

const conString = 'mongodb://localhost:27017/sampleDB';
mongoose.connect(conString, { useNewUrlParser: true });

/**
 * Start the expressjs server.
 */
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
