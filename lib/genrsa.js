'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$password = _ref.password;
    let

    /**
     * Generates an RSA private key
     *
     * See more at: [genrsa](http://www.openssl.org/docs/man1.0.2/apps/genrsa.html)
     * @param  {string|boolean} opts.password   pass in a string of password if the
     *                                          private key should be encrypted.
     *                                          (Use DES3 as default)
     * @param  {string}         opts.out        filename of the output file
     * @param  {number}         opts.numbits    the size of the private key to
     *                                          generate in bits
     * @return {Promise}
     */
    password = _ref$password === undefined ? false : _ref$password;
    var _ref$out = _ref.out;
    let out = _ref$out === undefined ? 'untitled.key' : _ref$out;
    var _ref$numbits = _ref.numbits;
    let numbits = _ref$numbits === undefined ? 2048 : _ref$numbits;

    let shouldEncrypt = (0, _lodash.isString)(password);
    let opts = {};

    // Add provided password
    if (shouldEncrypt) {
        opts.des3 = true;
        opts.passout = `pass:${ password }`;
    }

    // Set output path
    opts.out = out;

    // Set the size of the private key
    opts[numbits] = false;

    return _opensslWrapper2.default.qExec('genrsa', opts);
};

var _opensslWrapper = require('openssl-wrapper');

var _opensslWrapper2 = _interopRequireDefault(_opensslWrapper);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }