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
fs.copy('D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/myfile.txt', 'D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/mynewfile1.txt')
    .then(() => console.log('success!'))
    .catch(err => console.error(err))

// Async with callbacks:
fs.copy('D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/myfile.txt', 'D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/mynewfile2.txt', err => {
    if (err) return console.error(err)
    console.log('success!')
})

// Sync:
try {
    fs.copySync('D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/myfile.txt', 'D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/mynewfile3.txt')
    console.log('success!')
} catch (err) {
    console.error(err)
}

// Async/Await:
async function copyFiles () {
    try {
        await fs.copy('D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/myfile.txt', 'D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/mynewfile4.txt')
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

copyFiles()
```

###Методи
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
