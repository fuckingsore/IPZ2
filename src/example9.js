/**
 * @type {function(*=, *=, *=): (*)}
 */
var glob = require('glob');

/**
 * This function asynchronously changes the current working directory and looks for a list of paths to javaScript files in the current working directory.
 * @function module.exports()
 * @return {Promise<unknown>}
 */
module.exports = () => new Promise((resolve, reject) => {
    // some options
    options = {
        cwd: 'node_modules'
    };

    // for Files
    forFiles = function(err,files){ resolve('success!');};

    // glob it.
    glob('**/*.js', options, forFiles);
});
