const func = require('../example8.js');

describe("Ex 8: Checking whether the file has written a list of paths by receiving string 'success!' ", () => {

    test('Checking whether function works.', () =>func().then(data =>{
        expect(data).toBe('success!');
    }))
})
