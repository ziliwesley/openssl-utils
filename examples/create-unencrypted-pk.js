'use strict';

const opensslUtils = require('../index.js');

// Create an unencrypted private key
opensslUtils.createPrivateKey({
        out: 'unencrypted-private.key'
    })
    .then(function (res) {
        console.log(res);
    }, function (err) {
        console.log(err);
    });
