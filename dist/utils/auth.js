"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.signup = exports.signin = exports.protect = exports.newToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var _model = require("../resources/user/model");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newToken = user => {
  return _jsonwebtoken.default.sign({
    id: user.id
  }, _config.default.secrets.jwt, {
    expiresIn: _config.default.secrets.jwtExp
  });
};

exports.newToken = newToken;

const verifyToken = token => new Promise((resolve, reject) => {
  _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
});

exports.verifyToken = verifyToken;

const signup = async (req, res) => {
  let email = req.email;
  let password = req.password;

  if (!password || !email) {
    res.status(400);
    res.write('You must enter an email and a password');
    res.end();
  }

  res.status(200);
  let user = {
    id: email
  };
  let token = new newToken(user);
  res.write(token);
};

exports.signup = signup;

const signin = async (req, res) => {};

exports.signin = signin;

const protect = async (req, res, next) => {
  next();
};

exports.protect = protect;