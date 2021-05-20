/**
 * @type {function(*=, *=, *=): (*)}
 */
var glob = require('glob');


/**
 * This function asynchronously writes a list of paths to javaScript files in the current working directory.
 * @function module.exports()
 * @return {Promise<unknown>}
 */
module.exports = () => new Promise((resolve, reject) => {
    glob('*.js', function (err, files) {
        if (err) {
            reject(err);
        } else {
            //console.log(files);
            resolve('success!');
        }

    })
});
