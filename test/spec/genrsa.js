
import '../support/auto-mock-off.js';

import { spawn } from 'child_process';

import createPrivateKey from '../../src/genrsa.js';
import { verifyOpenSSLArgs } from '../support/utils.js';

describe('Create Private Key', () => {
    beforeEach(() => {
        spawn.mockClear();
    });

    pit('Default params', () => {
        return createPrivateKey()
            .then(() => {
                verifyOpenSSLArgs(spawn, [
                    'openssl',
                    ['genrsa', '-out', 'untitled.key', '2048']]);
            });
    });

    pit('Pass in <password>', () => {
        return createPrivateKey({
                password: 'secret'
            })
            .then(() => {
                verifyOpenSSLArgs(spawn, [
                    'openssl',
                    ['genrsa', '-des3', '-passout', 'pass:secret', '-out',
                        'untitled.key', '2048' ]]);
            });
    });

    pit('Pass in <out>', () => {
        return createPrivateKey({
                out: 'private.key'
            })
            .then(() => {
                verifyOpenSSLArgs(spawn, [
                    'openssl',
                    ['genrsa', '-out', 'private.key', '2048']]);
            });
    });

    pit('Pass in <numbits>', () => {
        return createPrivateKey({
                numbits: 4096
            })
            .then(() => {
                verifyOpenSSLArgs(spawn, [
                    'openssl',
                    ['genrsa', '-out', 'untitled.key', '4096']]);
            });
    });
});
