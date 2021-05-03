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




## Модуль `fs-extra`

`fs-extra` додає методи файлової системи, які не входять до власного модуля `fs`, і додає обіцяє підтримку методів `fs`. Він також використовує [`graceful-fs`](https://github.com/isaacs/node-graceful-fs) для запобігання помилкам EMFILE. Це повинна бути заміна замість fs.

## Установка
------------

```bash
npm install fs-extra
```

### Використання 
---------------

`fs-extra` - це незамінна заміна рідного `fs`. Усі методи у `fs` додаються до `fs-extra`. Усі методи `fs` повертають обіцяне, якщо зворотній виклик не передано.

Вам більше ніколи не потрібно буде включати оригінальний модуль `fs`:

```js
const fs = require('fs') // this is no longer necessary
```

Тепер ви можете зробити це так:

```js
const fs = require('fs-extra')
```

Якщо ви віддаєте перевагу пояснити, що використовуєте `fs-extra`, а не `fs`, то можете назвати свою змінну `fse`:

```js
const fse = require('fs-extra')
```

Ви також можете зберегти обидва варіанти, але це зайве:

```js
const fs = require('fs')
const fse = require('fs-extra')
```

### Sync vs Async vs Async/Await
-------------------------------

Більшість методів за замовчуванням є асинхронними. Усі асинхронні методи повернуть обіцянку, якщо зворотний виклик не передано.
Методи синхронізації, з іншого боку, викидають, якщо виникає помилка.
Крім того, Async / Await видасть помилку, якщо така трапиться.

Приклад:

```js
const fs = require('fs-extra')

// Async with promises:
fs.copy('./txt/testFile.txt', './txt/testFile1.txt')
    .then(() => console.log('success!'))
    .catch(err => console.error(err))

// Async with callbacks:
fs.copy('./txt/testFile.txt', './txt/testFile2.txt', err => {
    if (err) return console.error(err)
    console.log('success!')
})

// Sync:
try {
    fs.copySync('./txt/testFile.txt', './txt/testFile3.txt')
    console.log('success!')
} catch (err) {
    console.error(err)
}

// Async/Await:
async function copyFiles () {
    try {
        await fs.copy('./txt/testFile.txt', './txt/testFile4.txt')
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

copyFiles()
```

### Методи
---------

Модуль `fs-extra` має безліч [методів](https://github.com/jprichardson/node-fs-extra/blob/master/README.md#methods) для самих різних операцій з файлами і директоріями.

#### Примітка:
- Ви все ще можете використовувати рідні методи Node.js. Вони проміфікуються і копіюються на `fs-extra`. [Див. примітки.](docs/fs-read-write-writev.md)
- `walk()` та `walkSync()` було видалено з `fs-extra`. Якщо вам потрібна їх функціональність, то доступні як окремі пакети [`klaw`](https://github.com/jprichardson/node-klaw) та [`klaw-sync`](https://github.com/manidlou/node-klaw-sync).

### Третя сторона
-----------------

#### CLI

[fse-cli](https://www.npmjs.com/package/@atao60/fse-cli) дозволяє запускати `fs-extra` із консолі або за допомогою скриптів [npm](https://www.npmjs.com).

#### TypeScript

Якщо вам подобається TypeScript, ви можете використовувати `fs-extra` разом з цим: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/fs-extra

#### Перегляд файлів / каталогів

Якщо ви хочете спостерігати за змінами у файлах або каталогах, тоді вам слід скористатися [chokidar](https://github.com/paulmillr/chokidar).

#### Отримати інформацію про файлову систему (пристрої, розділи)

[fs-filesystem](https://github.com/arthurintelligence/node-fs-filesystem) дозволяє читати стан файлової системи хосту, на якому вона запущена. Він повертає інформацію як про пристрої, так і про розділи системи.

#### Різне

- [fs-extra-debug](https://github.com/jdxcode/fs-extra-debug) - надсилає ваші fs-extra виклики до [debug](https://npmjs.org/package/debug).
- [mfs](https://github.com/cadorn/mfs) - відстежує ваші fs-extra виклики

