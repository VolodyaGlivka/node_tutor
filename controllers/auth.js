class AuthController {
  static register(req, res) {}

  static auth(req, res) {
    res.status(200).send('connect');
  }
}

module.exports = AuthController;
