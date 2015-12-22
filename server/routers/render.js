import fs from 'fs';
import path from 'path';
import express from 'express';

const DIST = path.resolve(__dirname, '../../dist');
const NONE_LANG_DIST = ['.', '..', 'statics'];
const BUNDLE_NAME = 'routes.bundle.js';


const requiredRenderRoute = [];

const router = express.Router();
router.route('*')
  .get((req, res) => {
    const lang = req.LANG || 'zh';
    const RENDER_ROUTE_PATH = path.resolve(DIST, lang, BUNDLE_NAME);
    if (requiredRenderRoute.indexOf(lang) !== -1) {
      return require(RENDER_ROUTE_PATH)['default'](req, res);
    } else if (fs.statSync(RENDER_ROUTE_PATH).isFile()){
      requiredRenderRoute.push(lang);
      return require(RENDER_ROUTE_PATH)['default'](req, res);
    }
    return res.status(200).send({ msg: `oops ${lang}` });
  });

export default router;
