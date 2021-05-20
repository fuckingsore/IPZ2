const task = require("../example1.js")
const fs = require("fs-extra");

fs.removeSync('./src/txt/FirstDir');

describe('Ex 1: Creating ASync directory and file.', () => {

    test('Checking the contents of the file.', () =>task().then(data =>{
        expect(data).toBe('Hello World & Node :)');
    }))
})
