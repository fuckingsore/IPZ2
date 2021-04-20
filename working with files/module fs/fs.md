## Модуль fs

  Для роботи з файловою системою node забезпечує модуль "fs". Команди імітують операції POSIX, і більшість методів працюють синхронно або асинхронно. Ми розглянемо, як використовувати обидва, а потім встановимо, що є кращим варіантом. Модуль «FS» має безліч функцій для самих різних операцій з файлами і директоріями. Ось [документація](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html).
  
  Почнемо з базового прикладу роботи з файловою системою. Цей приклад створює каталог, створює файл всередині нього, а потім записує вміст файлу на консоль:
  
  ` var fs = require('fs');

fs.mkdir('./newDir',0o777, function (err) {
    if (err) throw err;

    fs.writeFile('./newDir/messageFile.txt', 'Hello World & Node :)', function (err) {
        if (err) throw err;
        console.log('File created with contents:');

        fs.readFile('./newDir/messageFile.txt','UTF-8' ,function (err, data) {
            if (err) throw err;
            console.log(data);
        });
    });
}); `
