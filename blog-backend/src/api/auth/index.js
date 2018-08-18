// POST /api/auth/login 비밀번호로 로그인
// GET /api/auth/check 현재 로그인 상태를 확인
// POST /api/auth/logout 로그아웃

const Router = require('koa-router');

const auth = new Router();
const authCtrl = require('./auth.ctrl');

auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);

module.exports = auth;
