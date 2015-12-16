'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selfSign = selfSign;

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
 * @param  {string}         opts.out        filename of the cretficate request
 * @param  {number}         opts.numbits    the size of the private key to
 *                                          generate in bits
 * @param  {number}         opts.subjects 
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
        // `-in=<req>`
        in: req,
        // `-out=<out>`
        out,
        // `-req`
        req: true,
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