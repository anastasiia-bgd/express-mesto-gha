const { celebrate, Joi } = require('celebrate');

const LINK_REGEXP = /https?:\/\/(www\.)?\w+[-.~:/?#[\]@!$&'()*+,;=]*#?/;

module.exports.validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(LINK_REGEXP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

module.exports.validationUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(LINK_REGEXP),
  }),
});

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(LINK_REGEXP),
  }),
});

module.exports.validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

// const {
//   Joi,
//   celebrate,
// } = require('celebrate');
// const isUrl = require('validator/lib/isURL');
// const BadRequest = require('../errors/BadRequest');

// const urlValidation = (url) => {
//   if (isUrl(url)) return url;
//   throw new BadRequest('Incorrect URL');
// };

// const IdValidation = (id) => {
//   const regex = /^[0-9a-fA-F]{24}$/;
//   if (regex.test(id)) return id;
//   throw new BadRequest('Incorrect id');
// };

// module.exports.createUserValidation = celebrate({
//   body: Joi.object()
//     .keys({
//       name: Joi.string()
//         .min(2)
//         .max(30),
//       about: Joi.string()
//         .min(2)
//         .max(30),
//       email: Joi.string()
//         .required()
//         .email(),
//       avatar: Joi.string()
//         .custom(urlValidation),
//       password: Joi.string()
//         .required(),
//     }),
// });

// module.exports.cardByIdValidation = celebrate({
//   params: Joi.object()
//     .keys({
//       cardId: Joi.string()
//         .required()
//         .custom(IdValidation),
//     }),
// });

// module.exports.loginValidation = celebrate({
//   body: Joi.object()
//     .keys({
//       email: Joi.string()
//         .required()
//         .email(),
//       password: Joi.string()
//         .required(),
//     }),
// });

// module.exports.validationUpdateAvatar = celebrate({
//   body: Joi.object()
//     .keys({
//       avatar: Joi.string()
//         .required()
//         .custom(urlValidation),
//     }),
// });

// module.exports.updateUserValidation = celebrate({
//   body: Joi.object()
//     .keys({
//       name: Joi.string()
//         .min(2)
//         .max(30)
//         .required(),
//       about: Joi.string()
//         .min(2)
//         .max(30)
//         .required(),
//     }),
// });

// module.exports.createCardValidation = celebrate({
//   body: Joi.object()
//     .keys({
//       name: Joi.string()
//         .min(2)
//         .max(30)
//         .required(),
//       link: Joi.string()
//         .required()
//         .custom(urlValidation),
//     }),
// });

// module.exports.userIdValidation = celebrate({
//   params: Joi.object()
//     .keys({
//       userId: Joi.string()
//         .required()
//         .custom(IdValidation),
//     }),
// });
