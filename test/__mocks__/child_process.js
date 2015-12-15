const childProcessMock = jest.genMockFromModule('child_process');

function noop() {
    // Do nothing
}

childProcessMock.spawn.mockImpl(function () {
    return {
        stdout: {
            on: noop
        },

        stderr: {
            on: noop
        },

        stdin: {
            end: noop
        },

        on: function (event, cb) {
            cb(1);
        }
    }
});

module.exports = childProcessMock;
