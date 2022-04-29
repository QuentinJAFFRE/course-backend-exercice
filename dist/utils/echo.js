"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.echo = void 0;

const echo = async (req, res) => {
  res.write(req.body);
  res.end();
};

exports.echo = echo;