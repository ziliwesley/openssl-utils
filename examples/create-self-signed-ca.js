'use strict';

const opensslUtils = require('../index.js');

let secret = '20151221';
let keyPath = './cert/ca.key';
let csrPath = './cert/ca.csr';

// Create an unencrypted private key
opensslUtils.createPrivateKey({
        out: keyPath,
        password: secret,
        numbits: 4096
    })
    .then(function () {
        return opensslUtils.createRequest({
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
    .catch(function (err) {
        console.log(err);
    });
