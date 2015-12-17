'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convetToPK12 = convetToPK12;

var _opensslWrapper = require('openssl-wrapper');

var _opensslWrapper2 = _interopRequireDefault(_opensslWrapper);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert pem format cert to pk12 client certificate
 *
 * See more at: [genrsa](http://www.openssl.org/docs/man1.0.2/apps/genrsa.html)
 * @param  {string|boolean} opts.password   set the password you need when you
 *                                          try to import this client cert
 * @param  {string}         opts.crt        filename of the pem format cert
 * @param  {string}         opts.key        filename of the private key
 * @param  {string}         opts.out        filename of the p12 format cert
 * @return {Promise}
 */
function convetToPK12() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    let password = _ref.password;
    var _ref$crt = _ref.crt;
    let crt = _ref$crt === undefined ? 'untitled.crt' : _ref$crt;
    var _ref$key = _ref.key;
    let key = _ref$key === undefined ? 'untitled.key' : _ref$key;
    var _ref$out = _ref.out;
    let out = _ref$out === undefined ? 'untitled.p12' : _ref$out;

    if (!(0, _lodash.isString)(password)) {
        return Promise.reject(new Error('argument "password" missing'));
    }

    let opts = {
        // `-export`
        export: true,
        // `-in=<crt>`
        in: crt,
        // `-inkey=<key>`
        inkey: key,
        // `-out=<out>`
        out,
        // `-passout=pass:<password>`
        passout: `pass:${ password }`
    };

    return _opensslWrapper2.default.qExec('pkcs12', opts);
}