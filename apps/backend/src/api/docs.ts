import { Router } from 'express';
import openapi from '../openapi.json';

const router = Router();

router.get('/', (req: import('express').Request, res: import('express').Response) => {
  res.json(openapi);
});

export default router;
