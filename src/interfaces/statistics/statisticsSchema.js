const Joi = require("joi");

const schema = Joi.object({
  clientId: Joi.number()
    .integer()
    .required(),

  initialDate: Joi.string()
    .required(),

  finalDate: Joi.string()
    .required(),
});

module.exports.validate = (query) => {
  return schema.validate(query);
};
