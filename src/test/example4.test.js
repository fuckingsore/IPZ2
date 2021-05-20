const Module = require('../example4')
const method1 = Module.part1
const method2 = Module.part2

describe("Ex.4 Checking whether the file has changed by receiving string 'success!' and 'file write complete'", ()=> {

    test("Checking  receiving string 'success!'", () => {
        method1().then((data) => expect(data).toBe('success!'))
    })

    test("Checking  receiving string 'file write complete'", () => {
        method2().then((data) => expect(data).toBe('file write complete'))
    })
})