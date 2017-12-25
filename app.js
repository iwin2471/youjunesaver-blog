import express from 'express';
import logger from 'morgan';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import path from 'path';
import randomstring from 'randomstring';
import fs from 'fs';
import cookieSession from 'cookie-session';
let debug = require('debug')('dicon:server');
var CORS = require('cors')();

let app = express();
let router = express.Router();

//module setting
import {Users} from './mongo';
let passport = require('./passport')(Users);


//function
require('./func');

//set engin
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  keys: ['h0t$ix'],
  cookie: {
    maxAge: 1000 * 60 * 60 // 유효기간 1시간
  }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(CORS);


//router setting
var index = require('./routes/index')(express.Router());
var users = require('./routes/users')(express.Router(), Users);
var auth = require('./routes/auth')(express.Router(), Users, passport);


app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

module.exports = app;
