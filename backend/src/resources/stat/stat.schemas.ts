import Joi from "joi";

const post = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required().max(50),
  description: Joi.string().required(),
});

const put = Joi.object({
  name: Joi.string().max(50),
  description: Joi.string(),
});

export default { post, put };
