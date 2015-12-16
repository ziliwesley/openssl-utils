'use strict';

const opensslUtils = require('../index.js');

let secret = '20151221';
let keyPath = './cert/ca.key';
let csrPath = './cert/ca.csr';
let crtPath = './cert/ca.crt';

// Create an unencrypted private key
opensslUtils.createPrivateKey({
        out: keyPath,
        password: secret,
        numbits: 4096
    })
    .then(function () {
        return opensslUtils.generateCertificateReq({
            key: keyPath,
            out: csrPath,
            password: secret,
            subjects: {
                C: 'CN',
                ST: 'Shanghai',
                L: 'Shanghai',
                O: 'OMG',
                OU: 'Top Secret',
                CN: 'Anonymous'
            }
        });
    })
    .then(function () {
        return opensslUtils.selfSign({
            key: keyPath,
            req: csrPath,
            out: crtPath,
            password: secret,
            days: 730
        });
    })
    .catch(function (err) {
        console.log(err);
    });
