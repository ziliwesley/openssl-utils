'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selfSign = selfSign;
exports.default = signCertificate;

var _opensslWrapper = require('openssl-wrapper');

var _opensslWrapper2 = _interopRequireDefault(_opensslWrapper);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Self sign a CA certificate
 *
 * @param  {string|boolean} opts.password   pass in a string of password if the
 *                                          private key should be encrypted.
 *                                          (Use DES3 as default)
 * @param  {string}         opts.key        specifies the file to read the
 *                                          private key from
 * @param  {string}         opts.req        filename of the certficate request
 * @param  {number}         opts.out        filename of the certificate
 * @param  {number}         opts.days       set expiration date for the cert
 * @return {Promise}
 */
function selfSign() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$password = _ref.password;
    let password = _ref$password === undefined ? false : _ref$password;
    var _ref$key = _ref.key;
    let key = _ref$key === undefined ? 'untitled.key' : _ref$key;
    var _ref$req = _ref.req;
    let req = _ref$req === undefined ? 'untitled.csr' : _ref$req;
    var _ref$out = _ref.out;
    let out = _ref$out === undefined ? 'untitled.crt' : _ref$out;
    var _ref$days = _ref.days;
    let days = _ref$days === undefined ? 365 : _ref$days;

    let wasEncrypted = (0, _lodash.isString)(password);
    let opts = {
        // `-signkey`
        signkey: key,
        // `-req`
        req: true,
        // `-sha256`,
        sha256: true,
        // `-in=<req>`
        in: req,
        // `-out=<out>`
        out,
        // `-days <days>`
        days
    };

    // Add provided password
    if (wasEncrypted) {
        // `-passin=pass:<secret>`
        opts.passin = `pass:${ password }`;
    }

    return _opensslWrapper2.default.qExec('x509', opts);
}

/**
 * Sign a certificate
 *
 * @param  {string|boolean} opts.password   pass in a string of password if the
 *                                          private key should be encrypted.
 *                                          (Use DES3 as default)
 * @param  {string}         opts.CACert     filename of the CA cert
 * @param  {string}         opts.CAkey      filename of the CA's PK
 * @param  {string}         opts.req        filename of the certficate request
 * @param  {number}         opts.out        filename of the certificate
 * @param  {number}         opts.days       set expiration date for the cert
 * @return {Promise}
 */
function signCertificate() {
    var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref2$password = _ref2.password;
    let password = _ref2$password === undefined ? false : _ref2$password;
    var _ref2$CAcert = _ref2.CAcert;
    let CAcert = _ref2$CAcert === undefined ? 'ca.crt' : _ref2$CAcert;
    var _ref2$CAkey = _ref2.CAkey;
    let CAkey = _ref2$CAkey === undefined ? 'ca.key' : _ref2$CAkey;
    var _ref2$req = _ref2.req;
    let req = _ref2$req === undefined ? 'untitled.csr' : _ref2$req;
    var _ref2$out = _ref2.out;
    let out = _ref2$out === undefined ? 'untitled.crt' : _ref2$out;
    var _ref2$days = _ref2.days;
    let days = _ref2$days === undefined ? 365 : _ref2$days;
    var _ref2$extfile = _ref2.extfile;
    let extfile = _ref2$extfile === undefined ? false : _ref2$extfile;

    let wasEncrypted = (0, _lodash.isString)(password);
    let hasExtraFile = (0, _lodash.isString)(extfile);
    let opts = {
        // `-req`
        req: true,
        // `-sha256`,
        sha256: true,
        // `-in=<req>`
        in: req,
        // `-CA=<CACert>`
        CA: CAcert,
        // `-CAkey=<CAkey>`
        CAkey: CAkey,
        // `-CAcreateserial`
        CAcreateserial: true,
        // `-out=<out>`
        out,
        // `-days <days>`
        days
    };

    // Add provided password
    if (wasEncrypted) {
        // `-passin=pass:<secret>`
        opts.passin = `pass:${ password }`;
    }

    // Supply an extra file for configuration
    if (hasExtraFile) {
        opts.extfile = extfile;
    }

    return _opensslWrapper2.default.qExec('x509', opts);
}