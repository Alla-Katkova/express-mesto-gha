const { default: mongoose } = require('mongoose');
const Card = require('../models/card');

// создать карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// вывести карточки
module.exports.getCardsFromDB = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

// удалить карточку
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then(() => {
      res.send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'Переданы некорректные данные _id. ' });
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: 'Карточка с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// поставить лайк на карточку
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'Переданы некорректные данные _id. ' });
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: 'Карточка с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// поставить дизлайк на карточку
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'Переданы некорректные данные _id. ' });
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: 'Карточка с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
