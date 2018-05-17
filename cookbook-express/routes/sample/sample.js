const express = require('express'),
  router = new express.Router(),
  { param, validationResult } = require('express-validator/check'),
  logger = require('../../lib/util/logger'),
  log = logger.getLogger('system'),
  wrapper = require('../../lib/util/handle_wrapper');

const handler = async(req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    log.error(errors.mapped());
    throw new Error(JSON.stringify(errors.mapped()));
  }
  return req.params;
};

router.get('/:id', [
  param('id').matches(/\d/).not().withMessage('id need to be integer')
], wrapper(handler));

module.exports = router;
