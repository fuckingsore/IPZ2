# Робота з файлами, модулі fs, fs-extra, path, glob

Сьогодні ми поговоримо про роботу з файлами в `Node.js`. Зокрема, мова піде про модулі [`fs`](https://github.com/fuckingsore/IPZ2/blob/main/doc/working%20with%20files.md#%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-fs), `fs-extra`, `path`  і `glob` - про файлові дескриптори, про шляхи до файлів, про отримання інформації про файли, про їх читання і запис, про роботу з директоріями і так далі.

---------------------------------------------------------------------------------------------

## Модуль `fs`

   Для роботи з файловою системою node забезпечує модуль `fs`. Команди імітують операції POSIX, і більшість методів працюють синхронно або асинхронно. Ми розглянемо, як використовувати обидва, а потім встановимо, що є кращим варіантом.



   ### Робота з файловою системою
   ------------------------------
   Почнемо з базового прикладу роботи з файловою системою. Цей приклад створює каталог, створює файл всередині нього, а потім записує вміст файлу на консоль:
  
```javascript
var fs = require('fs');

fs.mkdir('./txt/FirstDir',0o777, function (err) {
    if (err) throw err;

    fs.writeFile('./txt/FirstDir/messageFile.txt', 'Hello World & Node :)', function (err) {
        if (err) throw err;
        console.log('File created with contents:');

        fs.readFile('./txt/FirstDir/messageFile.txt','UTF-8' ,function (err, data) {
            if (err) throw err;
            console.log(data);
        });
    });
});
```

   Як видно з наведеного вище прикладу, кожен зворотній виклик розміщується в попередньому зворотньому виклику - це називається ланцюгом зворотніх викликів. Цього шаблону слід дотримуватися при використанні асинхронних методів, оскільки немає гарантії, що операції будуть виконані в тому порядку, в якому вони були створені. Це може призвести до непередбачуваної поведінки програми.
   
   Приклад можна переписати, використовуючи синхронний підхід:
   
```javascript   
var fs = require('fs');
fs.mkdirSync('./txt/SecondDir',0o777);
fs.writeFileSync('./txt/SecondDir/messageFile.txt', 'Hello World & Node');
var data = fs.readFileSync('./txt/SecondDir/messageFile.txt','UTF-8');
console.log('File created with contents:');
console.log(data);
```

   Краще використовувати асинхронний підхід на серверах з великим навантаженням, оскільки синхронні методи спричинять зупинку всього процесу і чекають завершення операції. Це заблокує будь-які вхідні з'єднання та інші події.



### Інформація про файл
-----------------------
   Об'єкт fs.Stats містить інформацію про певний файл або каталог. Це може бути використано для визначення типу об’єкта, з яким ми працюємо. У цьому прикладі ми отримуємо всі файлові об’єкти в каталозі та відображаємо, чи це файл, чи об’єкт каталогу.

```javascript
var fs = require('fs');

fs.readdir('../', function (err, files) {
    if (err) throw err;

    files.forEach( function (file) {
        fs.stat('../' + file, function (err, stats) {
            if (err) throw err;

            if (stats.isFile()) {
                console.log("%s is file", file);
            }
            else if (stats.isDirectory ()) {
                console.log("%s is a directory", file);
            }
            console.log('stats:  %s',JSON.stringify(stats));
        });
    });
});
```



### Перегляд файлів
-------------------
Метод fs.watchfile відстежує файл і запускає подію як тільки файл змінюється.
   
```javascript
var fs = require('fs');

fs.watchFile('./txt/testFile.txt', function (curr, prev) {
    console.log('the current mtime is: ' + curr.mtime);
    console.log('the previous mtime was: ' + prev.mtime);
});

fs.writeFile('./txt/testFile.txt', "changed just now", function (err) {
    if (err) throw err;

    console.log("file write complete");
});
```



### Документи Nodejs для подальшого читання
-------------------------------------------
[Документація Node API](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html) дуже детальна та містить перелік усіх можливих команд файлової системи, доступних під час роботи з `Nodejs`. Модуль `fs` теж має безліч [функцій](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html) для самих різних операцій з файлами і директоріями. 
