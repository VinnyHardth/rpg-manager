import Joi from "joi";

const post = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required().max(50),
  version: Joi.string().required().max(10),
});

const put = Joi.object({
  version: Joi.string().required().max(10),
});

export default { post, put };
