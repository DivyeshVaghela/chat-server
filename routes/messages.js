const app = require('express');
const router = app.Router();

const messagesCtrl = require('../controllers/messages');

const messageListHandler = async (req, res, next) => {
  try {
    const messages = await messagesCtrl.list(req.query);
    res.json(messages);
  } catch (e) {
    console.log('ERROR in messageListHandler', e);
    res.status(500).send();
  }
};

router.get('', messageListHandler);


module.exports = router;