import Joi from "@hapi/joi";

const stringSchema = Joi.string().trim();
export const objectIdSchema = Joi.string()
  .regex(/^[a-fA-F0-9]{24}$/)
  .required()
  .error(() => {
    return {
      message: 'ID must be a valid mongodb objectId.',
    };
  });

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

export const createPrescriptionSchema = () => {
  return Joi.object({
    usage: stringSchema.required(),
    duration: stringSchema.required(),
  });
};

export const updatePrescriptionSchema = () => {
  return Joi.object({
    usage: stringSchema,
    duration: stringSchema,
    taken: Joi.boolean()
  });
};

export const prescriptionParamSchema = () => {
  return Joi.object({
    prescriptionId: objectIdSchema,
  });
};