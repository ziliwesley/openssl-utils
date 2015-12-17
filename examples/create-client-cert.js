'use strict';

const opensslUtils = require('../index.js');

let CAsecret = '20151221';
let keyPath = './cert/client.key';
let csrPath = './cert/client.csr';
let crtPath = './cert/client.crt';
let CAKeyPath = './cert/ca.key';
let CACertPath = './cert/ca.crt';
let extfilePath = './examples/extra.cnf';
let p12ExportPass = 'simpleSecret';
let p12Path = './cert/client.p12';

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
                O: 'Site Manager',
                OU: 'Top Secret',
                CN: 'John'
            }
        });
    })
    .then(function () {
        return opensslUtils.signCertificate({
            password: CAsecret,
            req: csrPath,
            CAcert: CACertPath,
            CAkey: CAKeyPath,
            out: crtPath,
            days: 730
        });
    })
    .then(function () {
        return opensslUtils.convetToPK12({
            password: p12ExportPass,
            crt: crtPath,
            key: keyPath,
            out: p12Path
        });
    })
    .catch(function (err) {
        console.log(err);
    });
