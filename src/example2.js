/**
 * This function synchronously creating a directory, text file, write sentence in file and prints this to the console.
 * @function createDirSync
 * @return {String} data - string, which shows the contents of a text file
 */

/**
 * @example <caption>How to use createDirSync function</caption>
 *createDirSync() {
 *    fs.mkdirSync('path/to/dir', 0o777);
 *    fs.writeFileSync('path/to/file', 'Any text');
 *    var data = fs.readFileSync('path/to/file', 'UTF-8');
 *    console.log(data);
 *}
 */

 /**
 * @type {module:fs}
 */

var fs = require('fs');


function createDirSync(){

    fs.mkdirSync('./src/txt/SecondDir',0o777);
    fs.writeFileSync('./src/txt/SecondDir/messageFile.txt', 'Hello World & Node :)');
    var data = fs.readFileSync('./src/txt/SecondDir/messageFile.txt','UTF-8');
    console.log('File created with contents:');
    console.log(data);
    return data;

}

module.exports = createDirSync