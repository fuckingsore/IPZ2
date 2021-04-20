var fs = require('fs');

fs.mkdir('./FirstDir',0o777, function (err) {
    if (err) throw err;

    fs.writeFile('./FirstDir/messageFile.txt', 'Hello World & Node :)', function (err) {
        if (err) throw err;
        console.log('File created with contents:');

        fs.readFile('./FirstDir/messageFile.txt','UTF-8' ,function (err, data) {
            if (err) throw err;
            console.log(data);
        });
    });
});