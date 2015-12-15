
import '../support/auto-mock-off.js';

import { spawn } from 'child_process';

import generateCertificateReq from '../../src/req.js';
import { verifyOpenSSLArgs } from '../support/utils.js';

describe('Create Certificate Request', () => {

    beforeEach(() => {
        spawn.mockClear();
    });

    pit('Default params', () => {
        return generateCertificateReq()
            .catch((err) => {
                expect(err.message)
                    .toMatch(/argument "subjects" missing/);
            });
    });

    pit('Pass in <password>', () => {
        return generateCertificateReq({
                password: 'secret',
                subjects: {
                    C: 'US',
                    ST: 'CA',
                    L: 'LA',
                    O: 'Awesome Co.',
                    OU: 'Whatever Dept.',
                    CN: 'Your Name'
                }
            })
            .then(() => {
                verifyOpenSSLArgs(spawn, [
                    'openssl',
                    ['req', '-new', '-key', 'untitled.key', '-out',
                        'untitled.csr', '-subj',
                        '/CN=Your Name/OU=Whatever Dept./O=Awesome Co./L=LA/ST=CA/C=US',
                        '-passin', 'pass:secret']]);
            });
    });

    pit('Pass in <out>', () => {
        return generateCertificateReq({
                out: 'somename.csr',
                subjects: {
                    C: 'US',
                    ST: 'CA',
                    L: 'LA',
                    O: 'Awesome Co.',
                    OU: 'Whatever Dept.',
                    CN: 'Your Name'
                }
            })
            .then(() => {
                verifyOpenSSLArgs(spawn, [
                    'openssl',
                    ['req', '-new', '-key', 'untitled.key', '-out',
                        'somename.csr', '-subj',
                        '/CN=Your Name/OU=Whatever Dept./O=Awesome Co./L=LA/ST=CA/C=US']]);
            });
    });

    pit('Pass in <subjects>', () => {
        return generateCertificateReq({
                subjects: {
                    C: 'CN',
                    O: 'Oh'
                }
            })
            .then(() => {
                verifyOpenSSLArgs(spawn, [
                    'openssl',
                    ['req', '-new', '-key', 'untitled.key', '-out',
                        'untitled.csr', '-subj',
                        '/O=Oh/C=CN']]);
            });
    });
});
