
import '../support/auto-mock-off.js';

import { spawn } from 'child_process';

import signCertificate, { selfSign } from '../../src/x509.js';
import { verifyOpenSSLArgs } from '../support/utils.js';

describe('Sign Certificate Request', () => {

    describe('Self sign CA certificate', () => {
        beforeEach(() => {
            spawn.mockClear();
        });

        pit('Default params', () => {
            return selfSign()
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-signkey', 'untitled.key',
                            '-req', '-sha256',
                            '-in', 'untitled.csr', 
                            '-out', 'untitled.crt', 
                            '-days', 365]]);
                });
        });

        pit('Pass in <password>', () => {
            return selfSign({
                    password: 'secret'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-signkey', 'untitled.key',
                            '-req', '-sha256',
                            '-in', 'untitled.csr',
                            '-out', 'untitled.crt', '-days', 365,
                            '-passin', 'pass:secret']]);
                });
        });

        pit('Pass in <key>', () => {
            return selfSign({
                    key: 'somename.key'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-signkey', 'somename.key',
                            '-req', '-sha256',
                            '-in', 'untitled.csr',
                            '-out', 'untitled.crt', '-days', 365]]);
                });
        });

        pit('Pass in <req>', () => {
            return selfSign({
                    req: 'somename.csr'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-signkey', 'untitled.key',
                            '-req', '-sha256',
                            '-in', 'somename.csr',
                            '-out', 'untitled.crt', '-days', 365]]);
                });
        });

        pit('Pass in <out>', () => {
            return selfSign({
                    out: 'somename.crt'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-signkey', 'untitled.key',
                            '-req', '-sha256',
                            '-in', 'untitled.csr',
                            '-out', 'somename.crt', '-days', 365]]);
                });
        });

        pit('Pass in <days>', () => {
            return selfSign({
                    days: 900
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-signkey', 'untitled.key',
                            '-req', '-sha256',
                            '-in', 'untitled.csr',
                            '-out', 'untitled.crt', '-days', 900]]);
                });
        });
    });

    describe('Sign certificate using CA cert', () => {
        beforeEach(() => {
            spawn.mockClear();
        });

        pit('Default params', () => {
            return signCertificate()
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-req', '-sha256', '-in', 'untitled.csr',
                            '-CA', 'ca.crt', '-CAkey', 'ca.key', '-CAcreateserial',
                            '-out', 'untitled.crt', '-days', 365]]);
                });
        });

        pit('Pass in <password>', () => {
            return signCertificate({
                    password: 'secret'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-req', '-sha256', '-in', 'untitled.csr',
                            '-CA', 'ca.crt', '-CAkey', 'ca.key', '-CAcreateserial',
                            '-out', 'untitled.crt', '-days', 365, '-passin', 'pass:secret']]);
                });
        });

        pit('Pass in <CAcert>', () => {
            return signCertificate({
                    CAcert: 'somename.crt'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-req', '-sha256', '-in', 'untitled.csr',
                            '-CA', 'somename.crt', '-CAkey', 'ca.key', '-CAcreateserial',
                            '-out', 'untitled.crt', '-days', 365]]);
                });
        });

        pit('Pass in <CAkey>', () => {
            return signCertificate({
                    CAkey: 'somename.key'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-req', '-sha256', '-in', 'untitled.csr',
                            '-CA', 'ca.crt', '-CAkey', 'somename.key', '-CAcreateserial',
                            '-out', 'untitled.crt', '-days', 365]]);
                });
        });

        pit('Pass in <out>', () => {
            return signCertificate({
                    out: 'somename.crt'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-req', '-sha256', '-in', 'untitled.csr',
                            '-CA', 'ca.crt', '-CAkey', 'ca.key', '-CAcreateserial',
                            '-out', 'somename.crt', '-days', 365]]);
                });
        });

        pit('Pass in <days>', () => {
            return signCertificate({
                    days: 900
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-req', '-sha256', '-in', 'untitled.csr',
                            '-CA', 'ca.crt', '-CAkey', 'ca.key', '-CAcreateserial',
                            '-out', 'untitled.crt', '-days', 900]]);
                });
        });
    });
});
