import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validate } from '../middlewares/validate';
import { userSchema, updateSchema } from '../validation/schema';

const router = Router();

router.get('/users/:username', UserController.getUser);
router.delete('/users/:username', UserController.deleteUser);
router.patch('/users/:username', validate(updateSchema), UserController.updateUser);
router.get('/users/:username/repos', UserController.getUserRepos);

export default router;