import {
  Router
} from 'express';

import Controller from '../controllers';
import validator from '../middleware/validate-input.middleware';

import {
  signupSchema,
  loginSchema
} from '../utils/validation-schema.utils';

import tryCatch from '../utils/try-catch.utils';

const authRouter = Router();

authRouter.post(
  '/signup',
  validator(signupSchema(), 'body'),
  tryCatch(Controller.signup),
);

authRouter.post(
  '/login',
  validator(loginSchema(), 'body'),
  tryCatch(Controller.login),
);

export default authRouter;