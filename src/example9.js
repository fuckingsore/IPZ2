var glob = require('glob'),

// some options
    options = {

        cwd: 'node_modules'

    },

// for Files
    forFiles = function(err,files){ console.log(files);};

// glob it.
glob('**/*.md', options, forFiles);