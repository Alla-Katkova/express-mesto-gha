const mongoose = require('mongoose');
const validator = require('validator');

// Опишем схему:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальное количество символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальное количество символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(url);
      },
      message: 'Некорректный url',
    },
  },
  email: {
    type: String,
    required: [true, 'Заполните поле'],
    unique: true,
    validate: {
      validator(email) {
        validator.isEmail(email);
      },
      message: 'Введите верный email или пароль',
    },
  },
  password: {
    type: String,
    required: [true, 'Заполните поле'],
    select: false,
  },
}, { versionKey: false });

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
