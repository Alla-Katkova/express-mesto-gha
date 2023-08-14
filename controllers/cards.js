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
  if (req.params.cardId.length === 24) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
          return;
        }
        res.send({ message: 'Карточка успешно удалена.' });
      })
      .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }));
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные _id. ' });
  }
};

// поставить лайк на карточку
module.exports.likeCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })

      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
          return;
        }
        res.send(card);
      })
      .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }));
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные _id. ' });
  }
};

// поставить дизлайк на карточку
module.exports.dislikeCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })

      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
          return;
        }
        res.send(card);
      })
      .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }));
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные _id. ' });
  }
};
