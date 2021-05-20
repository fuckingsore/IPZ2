const func = require('../example7.js');

describe("Ex 7: Checking whether the file has written a list of paths by receiving string 'success!' ", () => {

    test('Checking whether function works.', () =>func().then(data =>{
        expect(data).toBe('success!');
    }))
})
