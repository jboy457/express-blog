require('dotenv').config();

const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { apis } = require('./gateway');

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api/v1', apis);

module.exports = app;
