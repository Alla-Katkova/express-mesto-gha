const { default: mongoose } = require('mongoose');
const User = require('../models/user');

// создать юзера
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// вывести список юзера
module.exports.getUsersFromDB = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

// найти юзера по айди
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: err.message });
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// редактировать инфу юзера
module.exports.editUserInfo = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true }) // чтобы валидация происходила не только в пост запросах, но и в патч исп runValidators
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
        }
      });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

// редактировать аватар юзера
module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: 'true', runValidators: true }) // чтобы валидация происходила не только в пост запросах, но и в патч исп runValidators
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
        }
      });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
