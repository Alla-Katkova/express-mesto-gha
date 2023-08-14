const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      //   Card.findById(card._id)
      //     .populate('owner')
      //     .then((data) => res.send(data))
      //     .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }))
      res.status(201).send(card)
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getCardsFromDB = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
          return;
        }
        res.send({ message: 'Карточка успешно удалена.'});
      })
      .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }));
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные _id. ' });
  }
};

