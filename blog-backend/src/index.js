require('dotenv').config();

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI
} = process.env;

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const mongoose = require('mongoose');

const api = require('./api');

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
  console.log('connected to mongodb');
}).catch((e) => {
  console.error(e);
});

router.use('/api', api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log('listening to port 4000');
});