const Module = require('../example3')
const method1 = Module.part1

describe("Ex.3 Checking containing of string array. ", ()=> {

    const expected = 'is file';

    test("Checking containing of string 'is file' in string array.", () => {
        method1().then((data) => expect(data.toString()).toEqual(expect.stringContaining(expected)))
    })
})