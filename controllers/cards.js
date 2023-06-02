const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const cardSchema = require('../models/card');

module.exports.getCards = (req, res, next) => {
  cardSchema
    .find({})
    .then((cards) => res.status(200)
      .send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  cardSchema
    .findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Cannot be found');
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new Forbidden('Card cannot be deleted'));
      }
      return card.deleteOne().then(() => res.send({ message: 'Card was deleted' }));
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;

  cardSchema
    .create({
      name,
      link,
      owner,
    })
    .then((card) => res.status(201)
      .send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400)
          .send({ message: 'Некорректные данные' });
      } else {
        next(err);
      }
    });
};

module.exports.addLike = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFound('Пользователь не найден');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Incorrect data'));
      }
      return next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFound('Сannot be found');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Incorrect data'));
      }
      return next(err);
    });
};
