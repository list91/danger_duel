// const fs = require('fs'); // Подключаем модуль fs для работы с файлами

export default class Data {
  constructor(filename) {
    this.filename = filename;
    this.data = {};
    // this.load();
  }

//   load() {
//     // Проверяем, существует ли файл
//     // if (fs.existsSync(this.filename)) {
//       // Читаем содержимое файла
//     //   const fileData = fs.readFileSync(this.filename);

//       // Преобразуем JSON-строку в объект
//       this.data = JSON.parse(fileData);
//     } else {
//       // Создаем новый пустой объект
//       this.data = {};
//       this.save();
//     }
//   }

  getData() {
    return this.data;
  }

  set(key, value) {
    // Обновляем значение для существующего ключа или добавляем новую пару ключ-значение
    this.data[key] = value;

    // Сохраняем изменения в файле
    // this.save();
  }

  append(key, value) {
    // Дописываем новую пару ключ-значение
    this.data[key] = value;

    // Сохраняем изменения в файле
    this.save();
  }

  get(key) {
    // Возвращаем значение по указанному ключу
    return this.data[key];
  }
}