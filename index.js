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

/**
 * Set up the REST API routes
 */
const routes = require('./routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**
 * Make sure to use routes AFTER using express.json and express.urlencoded.
 * If you do not do this, req.body will be undefined in your router.
 */
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
