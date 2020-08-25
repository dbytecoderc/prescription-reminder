import Joi from "@hapi/joi";

const stringSchema = Joi.string().trim();
// export const slug = Joi.string().guid();
export const signupSchema = () => {
  return Joi.object({
    email: stringSchema.email().required(),
    password: Joi.string().regex(/\d/).required(),
    name: stringSchema,
  });
};

export const loginSchema = () => {
  return Joi.object({
    email: stringSchema.email().required(),
    password: stringSchema,
  });
};