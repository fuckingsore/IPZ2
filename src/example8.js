/**
 * @type {function(*=, *=, *=): (*)}
 */
var glob = require('glob');

/**
 * This function asynchronously writes a list of paths to markdown files in the current working directory.
 * @function module.exports()
 * @return {Promise<unknown>}
 */
module.exports = () => new Promise((resolve, reject) => {

    glob('**/*.md', function (err, forFiles){
        if (err) {
            reject(err);
        } else {
            resolve('success!');
        }
    });
});
