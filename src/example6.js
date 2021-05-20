/**
 * @type {path.PlatformPath | path}
 */
var path = require("path");

/**
 * Normalizes the specified path.
 * @function exports.part1()
 * @return {Promise<unknown>}
 */
exports.part1 = () => new Promise( (resolve, reject) =>{
    // Normalization
    resolve('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));
})

/**
 * Combines the marked paths into one.
 * @function exports.part2()
 * @return {Promise<unknown>}
 */
exports.part2 = () => new Promise( (resolve, reject) =>{
    // Join
    resolve('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));
})

/**
 * Defines the specified ways in an absolute way.
 * @function exports.part3()
 * @return {Promise<unknown>}
 */
exports.part3 = () => new Promise( (resolve, reject) =>{
    // Resolve
    resolve('resolve : ' + path.resolve('main.js'));
})

/**
 * Returns the path file extension.
 * @function exports.part4()
 * @return {Promise<unknown>}
 */
exports.part4 = () => new Promise( (resolve, reject) =>{
    // extName
    resolve('ext name : ' + path.extname('main.js'));
})

