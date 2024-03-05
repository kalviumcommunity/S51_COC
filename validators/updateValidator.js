const Joi = require("joi");

const updateSchema = Joi.object({
  userAvatar: Joi.string().required(),
  userName: Joi.string().required(),
  caption: Joi.string().required(),
  tags: Joi.string().required(),
});

const updateValidator = (data) => {
  return updateSchema.validate(data, { abortEarly: false });
};

module.exports = updateValidator;
