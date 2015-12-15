/**
 * Module imports are hoisted, which is why you can’t turn off
 * auto-mocking beforehand.
 * Work-around: make this module the first import.
 *
 * Read more at:
 * [#377 autoMockOff doesn't work with es6 imports and babel](https://github.com/facebook/jest/issues/377)
 */

jest.autoMockOff();

jest.mock('child_process');
