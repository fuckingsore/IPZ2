var fs = require('fs');

fs.watchFile('./txt/testFile.txt', function (curr, prev) {
    console.log('the current mtime is: ' + curr.mtime);
    console.log('the previous mtime was: ' + prev.mtime);
});

fs.writeFile('./txt/testFile.txt', "it's a prank, bro", function (err) {
    if (err) throw err;

    console.log("file write complete");
});