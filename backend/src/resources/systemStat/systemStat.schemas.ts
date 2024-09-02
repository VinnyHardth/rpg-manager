import Joi from "joi";

const post = Joi.object({
  systemId: Joi.string().required(),
  statId: Joi.string().required(),
});

const put = Joi.object({
  systemId: Joi.string().required(),
  statId: Joi.string().required(),
});

export default { post, put };
