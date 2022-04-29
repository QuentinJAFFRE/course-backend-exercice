"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("./config"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _echo = require("./utils/echo");

var _auth = require("./utils/auth");

var _router = _interopRequireDefault(require("./resources/user/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.disable('x-powered-by');
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)('dev'));
app.post('/echo', _echo.echo);
app.post('/signup', _auth.signup);
app.post('/signin', _auth.signin);
app.use('/api', _auth.protect);
app.use('/api/user', _router.default);

const start = () => {
  try {
    app.listen(_config.default.port, () => {
      console.log(`REST API on http://localhost:${_config.default.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

exports.start = start;