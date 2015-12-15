'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$password = _ref.password;
    let

    /**
     * Generates a certificate request
     *
     * See more at: [genrsa](http://www.openssl.org/docs/man1.0.2/apps/genrsa.html)
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
    password = _ref$password === undefined ? false : _ref$password;
    var _ref$key = _ref.key;
    let key = _ref$key === undefined ? 'untitled.key' : _ref$key;
    var _ref$out = _ref.out;
    let out = _ref$out === undefined ? 'untitled.csr' : _ref$out;
    let subjects = _ref.subjects;

    if (!(0, _lodash.isPlainObject)(subjects)) {
        return Promise.reject(new TypeError('argument "subjects" missing'));
    }

    let expectEncryption = (0, _lodash.isString)(password);
    let subj = (0, _lodash.chain)(subjects).map((v, k) => `/${ k }=${ v }`).reduce((pair, memo) => memo + pair, '').value();

    let opts = {
        // `-new`
        new: true,
        // `-key=<key>`
        key,
        // `-out=<out>`
        out,
        // `-subj=<subjects>`
        subj
    };

    // Add provided password
    if (expectEncryption) {
        opts.passin = `pass:${ password }`;
    }

    return _opensslWrapper2.default.qExec('req', opts);
};

var _opensslWrapper = require('openssl-wrapper');

var _opensslWrapper2 = _interopRequireDefault(_opensslWrapper);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }