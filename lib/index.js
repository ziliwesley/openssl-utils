'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateCertificateReq = exports.createPrivateKey = undefined;

var _genrsa = require('./genrsa.js');

var _genrsa2 = _interopRequireDefault(_genrsa);

var _req = require('./req.js');

var _req2 = _interopRequireDefault(_req);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createPrivateKey = _genrsa2.default;
exports.generateCertificateReq = _req2.default;