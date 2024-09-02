import Joi from "joi";

const post = Joi.object({
  userId: Joi.string().required(),
  campaignId: Joi.string().required(),
  role: Joi.string().required(),
});

const put = Joi.object({
  userId: Joi.string().required(),
  campaignId: Joi.string().required(),
  role: Joi.string().required(),
});

export default { post, put };
