const Module = require('../example6')
const method1 = Module.part1
const method2 = Module.part2
const method3 = Module.part3
const method4 = Module.part4

describe("Ex.6 Checking containing of string array.", ()=>{
    const expected1 = 'normalization : ';
    const expected2 = 'joint path : ';
    const expected3 = 'resolve : ';
    const expected4 = 'ext name : ';

    test("Checking containing of string 'normalization : ' in string array.", () => {
        method1().then((data) => expect(data.toString()).toEqual(expect.stringContaining(expected1)))
    })

    test("Checking containing of string 'joint path : ' in string array.", () => {
        method2().then((data) => expect(data.toString()).toEqual(expect.stringContaining(expected2)))
    })

    test("Checking containing of string 'resolve : ' in string array.", () => {
        method3().then((data) => expect(data.toString()).toEqual(expect.stringContaining(expected3)))
    })

    test("Checking containing of string 'ext name : ' in string array.", () => {
        method4().then((data) => expect(data.toString()).toEqual(expect.stringContaining(expected4)))
    })
})