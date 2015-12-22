import express from 'express';
import logger from '../modules/logger';
import { login } from '../apis/auth';

const router = express.Router();

router.route('/')
  .post((req, res) => {
    const account = req.body;
    login(account)
      .then(account => {
        res.status(201).send(account);
      }, error => {
        logger.error({ data: error }, 'error');
        res.status(200).send(error);
      });
  });

export default router;
