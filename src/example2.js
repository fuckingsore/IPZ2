var fs = require('fs');
fs.mkdirSync('./txt/SecondDir',0o777);
fs.writeFileSync('./txt/SecondDir/messageFile.txt', 'Hello World & Node');
var data = fs.readFileSync('./txt/SecondDir/messageFile.txt','UTF-8');
console.log('File created with contents:');
console.log(data);