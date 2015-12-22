import bodyParser from 'body-parser';

export const urlEncodedBodyParser = bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
});

export const jsonBodyParser = bodyParser.json({limit: '50mb'});
