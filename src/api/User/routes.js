import { Router } from 'express';
import ctrl from './controllers';

const router = Router();

router.post('/signup', ctrl.sign_up);
router.post('/login', ctrl.login);

export default router;