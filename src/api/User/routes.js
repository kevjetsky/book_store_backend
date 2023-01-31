import { Router } from 'express';
import ctrl from './controllers';
import { checkAuth } from '../../middlewares/custom/checkAuth';

const router = Router();

router.post('/signup', ctrl.sign_up);
router.post('/login', ctrl.login);

// protectedd routes
router.get('/get/', 
    checkAuth(), 
    ctrl.getUser);

router.patch('/update',
    checkAuth(),
    ctrl.updateUser);

router.delete('/delete',
    checkAuth(),
    ctrl.deleteUser);

export default router;