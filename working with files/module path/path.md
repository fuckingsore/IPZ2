## Модуль Path

### Визначення та використання
------------------------------

Модуль `path` пропонує утиліти для роботи з шляхами до файлів та каталогів.

### Синтаксис
-------------

Синтаксис включення модуля `path` у вашу програму:

```js
var path = require('path');
```

### Властивості та методи `path`
--------------------------------

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
