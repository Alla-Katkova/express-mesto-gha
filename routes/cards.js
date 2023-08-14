const router = require('express').Router();
const {
  getCardsFromDB,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// GET — возвращает все карточки
router.get('/', getCardsFromDB);
// POST — создаёт карточку
router.post('/', createCard);
// DELETE — удаляет карточку по идентификатору
router.delete('/:cardId', deleteCard);
// PUT — поставить лайк карточке
router.put('/:cardId/likes', likeCard);
// DELETE — убрать лайк с карточки
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
