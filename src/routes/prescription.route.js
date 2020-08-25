import {
  Router
} from 'express';

import Controller from '../controllers';
import validator from '../middleware/validate-input.middleware';

import {
  checkAuthenticatedUser,
} from '../middleware/auth.middlerware';

import {
  createPrescriptionSchema,
  updatePrescriptionSchema,
  // prescriptionParamSchema
} from '../utils/validation-schema.utils';


import tryCatch from '../utils/try-catch.utils';

const prescriptionRouter = Router();

prescriptionRouter.post(
  '/create',
  checkAuthenticatedUser,
  validator(createPrescriptionSchema(), 'body'),
  tryCatch(Controller.createPrescription),
);

prescriptionRouter.patch(
  '/:prescriptionId',
  checkAuthenticatedUser,
  validator(updatePrescriptionSchema(), 'body'),
  // validator(prescriptionParamSchema(), 'params'),
  tryCatch(Controller.updatePrescription),
);

prescriptionRouter.delete(
  '/:prescriptionId',
  checkAuthenticatedUser,
  // validator(prescriptionParamSchema(), 'params'),
  tryCatch(Controller.deletePrescription),
);

export default prescriptionRouter;