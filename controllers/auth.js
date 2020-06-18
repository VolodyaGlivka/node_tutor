const User = require('../models/auth');

class AuthController {
  static register(req, res) {
    const { login, password } = req.body;
    const user = new User({ login, password });
    user
      .save()
      .then(() => {
        res.send(200);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static auth(req, res) {
    const { login, password } = req.body;
    User.find({ login, password })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = AuthController;
