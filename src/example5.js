const fs = require('fs-extra')


/**
 * Async function with promises makes copy of file.
 * @function exports.part1()
 * @return {Promise<unknown>}
 */
exports.part1 = () => new Promise( (resolve, reject) =>{
    fs.copy('./txt/testFile.txt', './txt/testFile1.txt')
        .then(() => resolve('success!'))
        .catch(err => reject(err))
});


/**
 * Async function with callbacks makes copy of file.
 * @function exports.part2()
 * @return {Promise<unknown>}
 */
exports.part2 = () => new Promise( (resolve, reject) =>{
    fs.copy('./txt/testFile.txt', './txt/testFile2.txt', err => {
        if (err) return reject(err)
        resolve('success!')
    })
})


/**
 * Sync function makes copy of file.
 * @function exports.part3()
 * @return {Promise<unknown>}
 */
exports.part3 = () => new Promise( (resolve, reject) =>{
    try {
        fs.copySync('./txt/testFile.txt', './txt/testFile3.txt')
        resolve('success!')
    } catch (err) {
        reject(err)
    }
})


/**
 * Async/Await function makes copy of file.
 * @function exports.part4()
 * @return {Promise<unknown>}
 */
exports.part4 = () => new Promise( (resolve, reject) =>{
    (async function() {
        try {
            await fs.copy('./txt/testFile.txt', './txt/testFile4.txt')
            resolve('success!')
        } catch (err) {
            reject(err)
        }
    })();
})


