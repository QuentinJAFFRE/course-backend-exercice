"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _server = require("../server");

var _model = require("../resources/user/model");

var _auth = require("../utils/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('API Authentication:', () => {
  const User = new _model.UserModel();
  let token;
  beforeEach(async () => {
    const user = User.create({
      email: 'a@a.com',
      password: 'hello'
    });
    token = (0, _auth.newToken)(user);
  });
  describe('api auth', () => {
    test('api should be locked down', async () => {
      const response = await (0, _supertest.default)(_server.app).get('/api/user');
      expect(response.statusCode).toBe(401);
    });
    test('passes with JWT', async () => {
      const jwt = `Bearer ${token}`;
      const result = await (0, _supertest.default)(_server.app).get('/api/user').set('Authorization', jwt);
      expect(result.statusCode).not.toBe(401);
    });
  });
});