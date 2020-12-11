const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({ passError: true });

const userSchema = Joi.object({
  name: Joi.string().min(1).max(10).required(),
});

const userValidator = validator.params(userSchema);

module.exports = {
  userValidator,
};
