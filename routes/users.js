const app = require('express');
const router = app.Router();

const usersCtrl = require('../controllers/users');

const userListHandler = async (req, res, next) => {
  try{
    const users = await usersCtrl.list();
    res.json(users);
  } catch (e) {
    console.log('ERROR in userListHandler', e);
    res.status(500).send();
  }
};

router.get('/', userListHandler);

module.exports = router;