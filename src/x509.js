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
 * @param  {string}         opts.req        filename of the certficate request
 * @param  {number}         opts.out        filename of the certificate
 * @param  {number}         opts.days       set expiration date for the cert
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
        opts.passin = `pass:${password}`;
    }

    return openssl.qExec('x509', opts);
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
export default function signCertificate({
    password = false,
    CAcert = 'ca.crt',
    CAkey = 'ca.key',
    req = 'untitled.csr',
    out = 'untitled.crt',
    days = 365
} = {}) {
    let wasEncrypted = isString(password);
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
        opts.passin = `pass:${password}`;
    }

    return openssl.qExec('x509', opts);
}
