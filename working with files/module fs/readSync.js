var fs = require('fs');
fs.mkdirSync('./SecondDirSync',0o777);
fs.writeFileSync('./SecondDirSync/messageFile.txt', 'Hello World & Node');
var data = fs.readFileSync('./SecondDirSync/messageFile.txt','UTF-8');
console.log('File created with contents:');
console.log(data);