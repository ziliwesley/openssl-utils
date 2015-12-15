import openssl from 'openssl-wrapper';
import { isString } from 'lodash';

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
export default function({
    password = false,
    out = 'untitled.key',
    numbits = 2048
} = {}) {

    let shouldEncrypt = isString(password);
    let opts = {};

    // Add provided password
    if (shouldEncrypt) {
        opts.des3 = true;
        opts.passout = `pass:${password}`;
    }

    // Set output path
    opts.out = out;

    // Set the size of the private key
    opts[numbits] = false;

    return openssl.qExec('genrsa', opts);
}
