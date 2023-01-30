import { Router } from 'express';
import ctrl from './controllers';

const router = Router();

router.post('/', ctrl.sign_up);

export default router;