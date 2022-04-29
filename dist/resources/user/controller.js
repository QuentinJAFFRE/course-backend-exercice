"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.me = void 0;

const me = (req, res) => {
  res.status(200).json({
    data: req.user
  });
};

exports.me = me;