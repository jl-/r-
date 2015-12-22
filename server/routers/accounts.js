import express from 'express';
import logger from '../modules/logger';
import { signup } from '../apis/auth';

const router = express.Router();

router.route('/')
  .post((req, res) => {
    const data = req.body;
    signup(data)
      .then(account => {
        res.status(201).send(account);
      }, error => {
        logger.error({ data: error }, 'error');
        res.status(200).send(error);
      });
  });

export default router;
