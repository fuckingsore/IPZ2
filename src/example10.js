/**
 * @type {function(*=, *=, *=): (*)}
 */
let glob = require('glob'),
    fs = require('fs');

/**
 * This function asynchronously reads javaScript files.
 * @function module.exports()
 * @param pat
 * @param forFile
 */
module.exports = function (pat, forFile) {

    pat = pat || '*.js';
    forFile = forFile || function (content) {
        console.log(content);
    };

    glob('*.js', function (err, files) {

        if (err) {
            console.log(err);

        } else {
            files.forEach(function (file) {

                fs.readFile(file, function (err, data) {

                    if (err) {
                        console.log(err);
                    } else {
                        forFile("success");
                    }
                });
            });
        }
    });
};

