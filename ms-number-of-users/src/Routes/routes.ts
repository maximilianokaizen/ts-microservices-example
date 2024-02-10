import { Router, Request, Response } from 'express';
/* controllers */
import { UsersController } from '../Modules/User/infrastructure/UsersController';

const router = Router();
const usersController = new UsersController();

/* Health Check */

router.get('/health', (req: Request, res: Response) => {
  res.status(200).send({
    status: 'OK',
    message: 'Success'
  });
});

/* Users Routes */

export default router;
