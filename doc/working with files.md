# Робота з файлами, модулі fs, fs-extra, path, glob

Сьогодні ми поговоримо про роботу з файлами в `Node.js`. Зокрема, мова піде про модулі [`fs`](https://github.com/fuckingsore/IPZ2/blob/main/doc/working%20with%20files.md#%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-fs), [`fs-extra`](https://github.com/fuckingsore/IPZ2/blob/main/doc/working%20with%20files.md#%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-fs-extra), [`path`](https://github.com/fuckingsore/IPZ2/blob/main/doc/working%20with%20files.md#%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-path)  і [`glob`](https://github.com/fuckingsore/IPZ2/blob/main/doc/working%20with%20files.md#%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-glob) - про файлові дескриптори, про шляхи до файлів, про отримання інформації про файли, про їх читання і запис, про роботу з директоріями і так далі.

## Модуль `fs`

   Для роботи з файловою системою node забезпечує модуль `fs`. Команди імітують операції POSIX, і більшість методів працюють синхронно або асинхронно. Ми розглянемо, як використовувати обидва, а потім встановимо, що є кращим варіантом.



   ### Робота з файловою системою

   Почнемо з базового прикладу роботи з файловою системою. Цей приклад створює каталог, створює файл всередині нього, а потім записує вміст файлу на консоль:

#### Example 1 

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

#### Example 2

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

   Об'єкт fs.Stats містить інформацію про певний файл або каталог. Це може бути використано для визначення типу об’єкта, з яким ми працюємо. У цьому прикладі ми отримуємо всі файлові об’єкти в каталозі та відображаємо, чи це файл, чи об’єкт каталогу.

#### Example 3
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

Метод fs.watchfile відстежує файл і запускає подію як тільки файл змінюється.

#### Example 4

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

[Документація Node API](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html) дуже детальна та містить перелік усіх можливих команд файлової системи, доступних під час роботи з `Nodejs`. Модуль `fs` теж має безліч [функцій](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html) для самих різних операцій з файлами і директоріями. 



## Модуль `fs-extra`

`fs-extra` додає методи файлової системи, які не входять до власного модуля `fs`, і додає підтримку методів `fs`. Він також використовує [`graceful-fs`](https://github.com/isaacs/node-graceful-fs) для запобігання помилкам EMFILE. Це покращена заміна методу `fs`.

## Установка

```bash
npm install fs-extra
```

### Використання 

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

Більшість методів за замовчуванням є асинхронними. Усі асинхронні методи повернуть обіцянку, якщо зворотний виклик не передано.
Методи синхронізації, з іншого боку, викидають, якщо виникає помилка.
Крім того, Async / Await видасть помилку, якщо така трапиться.

Приклад:

#### Example 5

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

Модуль `fs-extra` має безліч [методів](https://github.com/jprichardson/node-fs-extra/blob/master/README.md#methods) для самих різних операцій з файлами і директоріями.

#### Примітка

- Ви все ще можете використовувати рідні методи Node.js. Вони проміфікуються і копіюються на `fs-extra`. [Див. примітки.](docs/fs-read-write-writev.md)
- `walk()` та `walkSync()` було видалено з `fs-extra`. Якщо вам потрібна їх функціональність, то доступні як окремі пакети [`klaw`](https://github.com/jprichardson/node-klaw) та [`klaw-sync`](https://github.com/manidlou/node-klaw-sync).

### Третя сторона

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


## Модуль `path`

### Визначення та використання

Модуль `path` пропонує утиліти для роботи з шляхами до файлів та каталогів.

### Синтаксис

Синтаксис включення модуля `path` у вашу програму:

```js
var path = require('path');
```

### Властивості та методи `path`

| Метод  | Опис |
| ------------- | ------------- |
| [basename()](https://www.w3schools.com/nodejs/met_path_basename.asp)  | Повертає останню частину шляху  |
| [delimiter](https://www.w3schools.com/nodejs/met_path_delimeter.asp)  | Повертає роздільник, вказаний для платформи  |
| [dirname()](https://www.w3schools.com/nodejs/met_path_dirname.asp)  | Повертає каталоги шляху  |
| [extname()](https://www.w3schools.com/nodejs/met_path_extname.asp)  | Повертає розширення файлу шляху  |
| [format()](https://www.w3schools.com/nodejs/met_path_format.asp)  | Форматує об'єкт шляху у рядок шляху  |
| [isAbsolute()](https://www.w3schools.com/nodejs/met_path_isabsolute.asp)  | Повертає true, якщо шлях є абсолютним шляхом, інакше false  |
| [join()](https://www.w3schools.com/nodejs/met_path_join.asp)  | Об’єднує зазначені шляхи в один  |
| [normalize()](https://www.w3schools.com/nodejs/met_path_normalize.asp)  | Нормалізує вказаний шлях  |
| parse()  | Форматує рядок шляху в об'єкт шляху  |
| posix  | Повертає об’єкт, що містить певні властивості та методи POSIX  |
| relative()  | Повертає відносний шлях із одного вказаного шляху до іншого вказаного шляху  |
| resolve()  | Визначає вказані шляхи в абсолютний шлях  |
| sep  | Повертає роздільник сегментів, вказаний для платформи  |
| win32  | Повертає об'єкт, що містить властивості та методи, властиві Windows  |

### Приклад

#### Example 6

```js 
var path = require("path");

// Normalization
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));

// Join
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));

// Resolve
console.log('resolve : ' + path.resolve('main.js'));

// extName
console.log('ext name : ' + path.extname('main.js'));
```

#### Результат

``` normalization : \test\test1\2slashes\1slash
joint path : \test\test1\2slashes\1slash
resolve : D:\Lessons\Fourth_semestr\ipz-2\module_path\main.js
ext name : .js
```

### Більше про `path`

Модуль `path` має багато властивостей та методів, з якими ви додатково можете ознайомитись в документації [Node.js v16.0.0 documentation](https://nodejs.org/api/path.html).


## Модуль `glob`

Ви напевно вже стикалися з використанням шаблонів `glob` як способу використання символа підстановки `*` для подання будь-якого рядка символів. Це досить зручний метод вибору файлів, які відповідають певним шаблонам, тому було б непогано швидко розібратися з цим в середовищі програмування `nodejs`.
`Glob` пакета `npm` - відмінне рішення для вибору файлів в середовищі `node.js` з шаблонами `glob`, тому давайте поглянемо на деякі приклади `glob` в дії.

### Що таке `glob` та символ підстановки `*`

Це спосіб використання символу підстановки `*` для представлення нуля або більше символів:

```*.txt
```

Буде відповідати будь-якому файлу з розширенням .txt, яке буде відповідати helloworld.txt та readme.txt, але не index.js у даному каталозі. Це те, що можна використовувати, коли мова йде про фільтрацію файлів у менеджерах файлових систем, терміналах інтерфейсу командного рядка тощо. `Globs` можуть бути менш потужними, ніж шаблони `regEx`, але для більшості прикладів використання спрощені шаблони `glob` все ще достатньо хороші, щоб зробити роботу, коли справа стосується узгодження шаблонів та шляхів.

### Основне використання `glob` у `nodejs`

Ім'я пакету `glob`, тому його можна додати до проекту `node` зі звичайним синтаксисом, таким як:

```bash
npm install glob --save
```

Після установки пакета `glob npm` він може знадобитися в сценарії, як і будь-який інший вбудований модуль `nodejs` або користувальницький проект, який був встановлений в папку модулів `node` проекту. У папці тестового проекту створено простий файл `basic.js`, який відповідатиме будь-якому файлу `javaScript` у поточному робочому шляху.

#### Example 7

```js
var glob = require('glob');

glob('*.js', function (err, files) {

    if (err) {

        console.log(err);

    } else {

        // a list of paths to javaScript files in the current working directory
        console.log(files);

    }

});
```

За замовчуванням `glob` буде шукати файли, що відповідають заданому шаблону, у поточному робочому каталозі. Коли ми викликаємо це звідти, він просто видає нам `[basic.js]`, оскільки це поки що єдиний файл `javaScript` у тестовій папці, але можна здійснитий й рекурсивний пошук за допомогою шаблону `**`.

### Підстановочний знак `**`

Підстановочний знак `**` можна використовувати для пошуку того, що є в поточному робочому каталозі, а також будь-яких додаткових підкаталогів:

#### Example 8

```js
var glob = require('glob');

var forFiles = function(err,files){ console.log(files);};

glob('**/*.md', function (err, forFiles){
    
if (err) {

    console.log(err);

} else {

    // a list of paths to javaScript files in the current working directory
    console.log(forFiles);

}

});
```
Програма буде шукати та складати список назв файлів для кожного файлу із позначкою, знайденого у поточному робочому шляху та будь-якому додатковому шляху у поточній робочій папці.

### Зміна поточного робочого шляху

Якщо до `glob` передано три аргументи, другий може бути об'єктом `options`, і одним із багатьох варіантів, який можна змінити, є поточний робочий каталог, який за замовчуванням повертається `process.cwd ()` у `node.js`.

#### Example 9

```js
var glob = require('glob'),

// some options
    options = {

        cwd: 'node_modules'

    },

// for Files
    forFiles = function(err,files){ console.log(files);};

// glob it.
glob('**/*.md', options, forFiles);
```

### Читання файлів

`glob` призначений для зіставлення файлів, але коли справа доходить до фактичного читання вмісту файлів, необхідно буде використовувати додаткове рішення в поєднанні з `glob`. Таким чином, це не зовсім повноцінний обхідник файлової системи, але це цінний інструмент для створення обхідника з нуля, який буде підтримувати шаблони `glob`.

#### Example 10

```js
let glob = require('glob'),
    fs = require('fs');

let readFiles = function (pat, forFile) {

    pat = pat || '*.js';
    forFile = forFile || function (content) {
        console.log(content);
    };

    glob('*.js', function (err, files) {

        if (err) {

            console.log(err);

        } else {

            files.forEach(function (file) {

                fs.readFile(file, function (err, data) {

                    if (err) {

                        console.log(err);

                    } else {

                        forFile(data.toString());

                    }

                });

            });

        }

    });

};

readFiles();
```

### Glob patterns

Наступні символи мають особливе магічне значення при використанні в частині шляху:

- `*` Відповідає 0 або більше символів в одній частині шляху.
- `?` Відповідає 1 символу.
- `[...]` Відповідає діапазону символів, подібному до діапазону RegExp. Якщо першим символом діапазону є `!` або `^` тоді він відповідає будь-якому символу, що не входить в діапазон.
- `!(pattern|pattern|pattern)` Відповідає всьому, що не відповідає жодному із запропонованих шаблонів.
- `?(pattern|pattern|pattern)` Збігається з нулем або одним випадком поданих шаблонів.
- `+(pattern|pattern|pattern)` Відповідає одному чи кільком випадкам поданих шаблонів.
- `*(a|b|c)` Відповідає нулю або більше випадків поданих шаблонів.
- `@(pattern|pat*|pat?erN)` Відповідає точно одному із запропонованих шаблонів.
- `**` Якщо "globstar" є самотнім у частині шляху, тоді він відповідає нулю або більше каталогів та підкаталогів, що шукають збіги. Він не сканує каталоги зі зв’язаними посиланнями.

### Висновок

Це відмінне node.js рішення для швидкої роботи з шаблонами `glob`. На даний момент є файл [readme](https://github.com/isaacs/node-glob/blob/master/README.md) проекту, в якому детально описані додаткові параметри, які не описані в цій статті.


## Матеріал підготував 
* *студент групи ІВ-92 Залога Андрій* - [fuckingsore](https://github.com/fuckingsore)

><a href="https://github.com/fuckingsore/IPZ2" target="_blank">https://github.com/fuckingsore/IPZ2</a>


