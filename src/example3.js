/**
 * @type {module:fs}
 */
var fs = require('fs');

/**
 * This function asynchronously provides information about a specific file or directory.
 * @function exports.part1()
 * @return {Promise<unknown>}
 */
exports.part1 = () => new Promise( (resolve, reject) =>{
    fs.readdir('../', function (err, files) {
        let data = []
        if (err) throw err;

        files.forEach( function (file) {
            fs.stat('../' + file, function (err, stats) {
                if (err) throw err;

                if (stats.isFile()) {
                    resolve(file + " is file");
                }
                else if (stats.isDirectory ()) {
                    data.push(file + "is a directory");
                }
                data.push('stats:' + JSON.stringify(stats));
            });
        });
    });
})