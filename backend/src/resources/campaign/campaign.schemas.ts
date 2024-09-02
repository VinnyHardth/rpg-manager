import Joi from "joi";

const post = Joi.object({
  name: Joi.string().required().max(100),
  description: Joi.string().required(),
  userId: Joi.string().required().uuid(),
  systemId: Joi.string().required().uuid(),
});

const put = Joi.object({
  name: Joi.string().max(100),
  description: Joi.string(),
  userId: Joi.string().uuid(),
  systemId: Joi.string().uuid(),
});

export default { post, put };
