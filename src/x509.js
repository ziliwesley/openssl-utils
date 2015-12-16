import openssl from 'openssl-wrapper';
import { isString } from 'lodash';

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
export function selfSign({
    password = false,
    key = 'untitled.key',
    req = 'untitled.csr',
    out = 'untitled.crt',
    days = 365
} = {}) {
    let wasEncrypted = isString(password);
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
        opts.passin = `pass:${password}`;
    }

    return openssl.qExec('x509', opts);
}
