const Joi = require("joi");

const schema = Joi.object({
  segment: Joi
    .string()
    .alphanum()
    .allow("")
    .optional(),
  company: Joi
    .string()
    .alphanum()
    .allow("")
    .optional(),
  state: Joi
    .string()
    .alphanum()
    .allow("")
    .optional(),
  city: Joi
    .string()
    .alphanum()
    .allow("")
    .optional(),
  neighborhood: Joi
    .string()
    .alphanum()
    .allow("")
    .optional(),
});

module.exports.validate = (body) => {
  return schema.validate(body);
};
