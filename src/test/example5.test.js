const Module = require('../example5')
const method1 = Module.part1
const method2 = Module.part2
const method3 = Module.part3
const method4 = Module.part4

describe("Ex.5 Checking whether the file has copied by receiving string 'success!'", ()=>{

    test("Checking whether async with promises function worked.", ()=>{
        method1().then((data)=>expect(data).toBe('success!'))
    })

    test("Checking whether async function with callbacks worked.", ()=>{
        method2().then((data)=>expect(data).toBe('success!'))
    })

    test("Checking whether sync function worked.", ()=>{
        method3().then((data)=>expect(data).toBe('success!'))
    })

    test("Checking whether async/await function worked.", ()=>{
        method4().then((data)=>expect(data).toBe('success!'))
    })
})