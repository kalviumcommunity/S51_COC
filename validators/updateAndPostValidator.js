const Joi = require("joi");

const postUpdateSchema = Joi.object({
    captionID: Joi.number().required(),
    userAvatar: Joi.string().required(),
    userID: Joi.number().required(),
    userName: Joi.string().required(),
    caption: Joi.string().required(),
    tags: Joi.string().required(),
});

const updateAndPostValidator = (data) => {
    return postUpdateSchema.validate(data, { abortEarly: false });
};

module.exports = updateAndPostValidator;