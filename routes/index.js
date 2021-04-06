const app = require('express');
const router = app.Router();

router.use('/users', require('./users'));
router.use('/messages', require('./messages'));

module.exports = router;