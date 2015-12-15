'use strict';

const opensslUtils = require('../index.js');

opensslUtils.createPrivateKey()
    .then(function (res) {
        console.log(res);
    }, function (err) {
        console.log(err);
    });
