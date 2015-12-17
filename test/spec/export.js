
import '../support/auto-mock-off.js';

import { spawn } from 'child_process';

import { convetToPK12 } from '../../src/export.js';
import { verifyOpenSSLArgs } from '../support/utils.js';

describe('Export and convert certificate', () => {
    
    describe('To P12', () => {
        beforeEach(() => {
            spawn.mockClear();
        });

        pit('Default params', () => {
            return convetToPK12()
                .catch((err) => {
                    expect(err.message)
                        .toMatch(/argument "password" missing/);
                });
        });

        pit('Pass in <password>', () => {
            return convetToPK12({
                    password: 'secret'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['pkcs12', '-export', '-in', 'untitled.crt', 
                            '-inkey', 'untitled.key', '-out', 'untitled.p12',
                            '-passout', 'pass:secret']]);
                });
        });

        pit('Pass in <crt>', () => {
            return convetToPK12({
                    password: 'secret',
                    crt: 'somefile.crt'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['pkcs12', '-export', '-in', 'somefile.crt', 
                            '-inkey', 'untitled.key', '-out', 'untitled.p12',
                            '-passout', 'pass:secret']]);
                });
        });

        pit('Pass in <key>', () => {
            return convetToPK12({
                    password: 'secret',
                    key: 'somefile.key'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['pkcs12', '-export', '-in', 'untitled.crt', 
                            '-inkey', 'somefile.key', '-out', 'untitled.p12',
                            '-passout', 'pass:secret']]);
                });
        });

        pit('Pass in <out>', () => {
            return convetToPK12({
                    password: 'secret',
                    out: 'somefile.p12'
                })
                .then(() => {
                    verifyOpenSSLArgs(spawn, [
                        'openssl',
                        ['pkcs12', '-export', '-in', 'untitled.crt', 
                            '-inkey', 'untitled.key', '-out', 'somefile.p12',
                            '-passout', 'pass:secret']]);
                });
        });
    });
});
