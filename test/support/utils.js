/**
 * Test if openssl will be executed with expected
 * arguments
 * @param  {Spawn} spawn  Mocked spawn object
 * @param  {Array} args   Arguments called with spwan
 */
export function verifyOpenSSLArgs(spawn, args) {
    expect(spawn.mock.calls[0])
        .toEqual(args);
}