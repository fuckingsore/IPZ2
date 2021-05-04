var glob = require('glob');

var forFiles = function(err,files){ console.log(files);};

glob('**/*.txt', function (err, forFiles){

    if (err) {

        console.log(err);

    } else {

        // a list of paths to javaScript files in the current working directory
        console.log(forFiles);

    }

});