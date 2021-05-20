/**
 * @type {module:fs}
 */
var fs = require('fs');

/**
 *This function asynchronously creates a directory, text file, writes sentence in file, reads file and prints
 * this to the console.
 * @function module.exports()
 * @return {Promise<unknown>}
 */
module.exports =() => {
    return new Promise((resolve, reject) => {

        /**
         * This function asynchronously creates a directory and prints this to the console 'File created with contents:'.
         * @function fs.mkdir
         */
        fs.mkdir('./src/txt/FirstDir', 0o777, function (err) {
            if (err) throw err;

            /**
             * This function asynchronously creates text file and writes sentence in file and prints to the console
             * 'File created with contents:'.
             * @function fs.writeFile
             */
            fs.writeFile('./src/txt/FirstDir/messageFile.txt', 'Hello World & Node :)', function (err) {
                if (err) {
                    reject(err)
                    return
                }
                //console.log('File created with contents:');

                /**
                 * This function asynchronously reads file and prints this to the console.
                 * @function fs.readFile
                 */
                fs.readFile('./src/txt/FirstDir/messageFile.txt', 'UTF-8', function (err, data) {
                    if (err) {
                        reject(err)
                        return
                    }
                    //console.log(data);
                    resolve(data);
                });
            });
        });
    });
}

