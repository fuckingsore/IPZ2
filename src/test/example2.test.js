const createDirSync = require('../example2');
const fs = require("fs-extra");

fs.removeSync('./src/txt/SecondDir');

describe('Ex 2: Creating Sync directory and file.', () => {

    test('Checking the contents of the file.', () => {
        expect(createDirSync()).toBe('Hello World & Node :)');
    })
})