import openssl from 'openssl-wrapper';
import { isString, chain, isPlainObject } from 'lodash';

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
export default function({
    password = false,
    key = 'untitled.key',
    out = 'untitled.csr',
    subjects
} = {}) {
    if (!isPlainObject(subjects)) {
        return Promise.reject(
            new TypeError('argument "subjects" missing'));
    }

    let expectEncryption = isString(password);
    let subj = chain(subjects)
        .map((v, k) => `/${k}=${v}`)
        .reduce((pair, memo) => memo + pair, '')
        .value();

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
        opts.passin = `pass:${password}`;
    }

    return openssl.qExec('req', opts);
}
