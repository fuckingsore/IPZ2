## Модуль fs-extra

`fs-extra` додає методи файлової системи, які не входять до власного модуля `fs`, і додає обіцяє підтримку методів `fs`. Він також використовує [`graceful-fs`](https://github.com/isaacs/node-graceful-fs) для запобігання помилкам EMFILE. Це повинна бути заміна замість fs.

## Установка
------------

```bash
npm install fs-extra
```

## Використання 
---------------

`fs-extra` - це незамінна заміна рідного `fs`. Усі методи у `fs` додаються до `fs-extr`a. Усі методи `fs` повертають обіцяне, якщо зворотний виклик не передано.

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

## Sync vs Async vs Async/Await
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

