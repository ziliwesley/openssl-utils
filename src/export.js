import openssl from 'openssl-wrapper';
import { isString } from 'lodash';

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
export function convetToPK12 ({
    password,
    crt = 'untitled.crt',
    key = 'untitled.key',
    out = 'untitled.p12'
} = {}) {
    if (!isString(password)) {
        return Promise.reject(
            new Error('argument "password" missing'));
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
        passout: `pass:${password}`
    };

    return openssl.qExec('pkcs12', opts);
}
