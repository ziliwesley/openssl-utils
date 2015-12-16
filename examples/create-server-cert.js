'use strict';

const opensslUtils = require('../index.js');

let CAsecret = '20151221';
let keyPath = './cert/server.key';
let csrPath = './cert/server.csr';
let crtPath = './cert/server.crt';
let CAKeyPath = './cert/ca.key';
let CACertPath = './cert/ca.crt';

// Create an unencrypted private key
opensslUtils.createPrivateKey({
        out: keyPath,
        numbits: 4096
    })
    .then(function () {
        return opensslUtils.generateCertificateReq({
            key: keyPath,
            out: csrPath,
            subjects: {
                C: 'CN',
                ST: 'Shanghai',
                L: 'Shanghai',
                O: 'Some Site',
                OU: 'Top Secret',
                CN: 'www.example.com'
            }
        });
    })
    .then(function () {
        return opensslUtils.signCertificate({
            password: CAsecret,
            req: csrPath,
            CACert: CACertPath,
            CAkey: CAKeyPath,
            out: crtPath,
            days: 730
        });
    })
    .catch(function (err) {
        console.log(err);
    });
