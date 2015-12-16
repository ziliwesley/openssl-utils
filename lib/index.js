'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signCertificate = exports.selfSign = exports.generateCertificateReq = exports.createPrivateKey = undefined;

var _genrsa = require('./genrsa.js');

var _genrsa2 = _interopRequireDefault(_genrsa);

var _req = require('./req.js');

var _req2 = _interopRequireDefault(_req);

var _x = require('./x509.js');

var _x2 = _interopRequireDefault(_x);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createPrivateKey = _genrsa2.default;
exports.generateCertificateReq = _req2.default;
exports.selfSign = _x.selfSign;
exports.signCertificate = _x2.default;