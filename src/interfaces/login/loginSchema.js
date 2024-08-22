const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .alphanum()
    .required(),
});

module.exports.validate = (body) => {
  return schema.validate(body);
};
