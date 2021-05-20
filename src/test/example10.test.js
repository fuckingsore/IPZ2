const func = require('../example10.js');

describe("Ex 10: Checking whether the file has read by receiving string 'success!' ", () => {

    test('Checking whether functions work.', () =>{
        func(undefined, (data)=>expect(data).toBe('success!'))
    })
})