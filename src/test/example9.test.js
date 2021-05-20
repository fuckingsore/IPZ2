const func = require('../example9.js');

describe("Ex 9: Checking whether the current working directory has changed and js files have found by receiving string 'success!' ", () => {

    test('Checking whether functions work.', () =>func().then(data =>{
        expect(data).toBe('success!');
    }))
})
