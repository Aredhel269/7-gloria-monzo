import NotFound from '../../models/NotFound'

import * as express from 'express';

const router = express.Router();

router.use('*', (req, res) => {
  const notFound = new NotFound();
  res.status(404).json(notFound);
});

module.exports = router;


module.exports = router
