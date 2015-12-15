
import '../support/auto-mock-off.js';

import { spawn } from 'child_process';

import createPrivateKey from '../../src/genrsa.js';

describe('Create Private Key', () => {
    beforeEach(() => {
        spawn.mockClear();
    });

    pit('Default params', () => {
        return createPrivateKey()
            .then(() => {
                expect(spawn.mock.calls[0])
                    .toEqual([
                        'openssl',
                        [
                            'genrsa',
                            '-out',
                            'untitled.key',
                            '2048'
                        ]
                    ]);
            });
    });

    pit('Pass in a password', () => {
        return createPrivateKey({
                password: 'secret'
            })
            .then(() => {
                expect(spawn.mock.calls[0])
                    .toEqual([
                        'openssl',
                        [
                            'genrsa',
                            '-des3',
                            '-passout',
                            'pass:secret',
                            '-out',
                            'untitled.key',
                            '2048'
                        ]
                    ]);
            });
    });
});
