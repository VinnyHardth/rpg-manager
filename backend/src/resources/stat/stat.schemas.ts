import Joi from "joi";

const post = Joi.object({
  name: Joi.string().required().max(50),
  description: Joi.string().required(),
});

const put = Joi.object({
  name: Joi.string().max(50),
  description: Joi.string(),
});

export default { post, put };
