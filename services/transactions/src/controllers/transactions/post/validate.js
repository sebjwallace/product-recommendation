const Joi = require('@hapi/joi');

const transaction = Joi.object().keys({
  customerId: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().required()
});

const schema = Joi.alternatives().try(
  transaction,
  Joi.array().items(transaction)
);

module.exports = function(req, res, next) {
  const { error } = schema.validate(req.body);
  if(error) return res.status(400).send(error);
  next()
}