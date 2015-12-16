
import '../support/auto-mock-off.js';

import { spawn } from 'child_process';

import { selfSign } from '../../src/x509.js';
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
                        ['x509', '-signkey', 'untitled.key', '-in', 'untitled.csr',
                            '-out', 'untitled.crt', '-req', '-days', 365]]);
                });
        });

        pit('Pass in <password>', () => {
            return selfSign({
                    password: 'secret'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-signkey', 'untitled.key', '-in', 'untitled.csr',
                            '-out', 'untitled.crt', '-req', '-days', 365,
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
                        ['x509', '-signkey', 'somename.key', '-in', 'untitled.csr',
                            '-out', 'untitled.crt', '-req', '-days', 365]]);
                });
        });

        pit('Pass in <req>', () => {
            return selfSign({
                    req: 'somename.csr'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-signkey', 'untitled.key', '-in', 'somename.csr',
                            '-out', 'untitled.crt', '-req', '-days', 365]]);
                });
        });

        pit('Pass in <out>', () => {
            return selfSign({
                    out: 'somename.crt'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-signkey', 'untitled.key', '-in', 'untitled.csr',
                            '-out', 'somename.crt', '-req', '-days', 365]]);
                });
        });

        pit('Pass in <days>', () => {
            return selfSign({
                    days: 900
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['x509', '-signkey', 'untitled.key', '-in', 'untitled.csr',
                            '-out', 'untitled.crt', '-req', '-days', 900]]);
                });
        });
    });
});
