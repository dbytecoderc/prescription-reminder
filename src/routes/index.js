import {
  Router
} from 'express';

import authRouter from './auth.route';
import prescriptionRouter from './prescription.route'


const router = Router();

router.use('/auth', authRouter);
router.use('/prescription', prescriptionRouter)


export default router;