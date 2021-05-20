/**
 * @type {module:fs}
 */
var fs = require('fs');


/**
 * This function asynchronously tracks the file and triggers the event as soon as the file changes.
 * @function exports.part1()
 * @return {Promise<unknown>}
 */
exports.part1 =() => new Promise( (resolve, reject) => {
    fs.watchFile('./src/txt/testFile.txt', function (curr, prev) {
        //console.log('the current mtime is: ' + curr.mtime);
        //console.log('the previous mtime was: ' + prev.mtime);
        resolve('success!');
    });
})

/**
 * This function asynchronously creates and writes text into text file.
 * @function exports.part2()
 * @return {Promise<unknown>}
 */
exports.part2 =() => new Promise( (resolve, reject) => {
    fs.writeFile('./src/txt/testFile.txt', "it's a prank, bro", function (err) {
        if (err) throw err;
        resolve("file write complete");
    });
})
