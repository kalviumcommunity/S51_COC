const Joi = require("joi");

const userSchema = Joi.object({
  userID: Joi.number().required(),
  username: Joi.string().required(),
});

const userValidator = (data) => {
  return userSchema.validate(data, { abortEarly: false });
};

module.exports = userValidator;
