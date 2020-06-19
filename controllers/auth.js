const bcrypt = require('bcryptjs');

const User = require('../models/auth');
const TokenModel = require('../models/token');
const Token = require('../token_config/tokenFunctionality');

class AuthController {
  static register(req, res) {
    const { login, password } = req.body;
    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({ login, password: hashedPassword });
      user
        .save()
        .then((newUser) => {
          return AuthController.authCreateToken(newUser, res);
        })
        .catch((err) => {
          res.send(err);
        });
    });
  }

  static checkPassword(requestPassword, dbPassword) {
    return bcrypt.compare(requestPassword, dbPassword);
  }

  static authCreateToken(user, res) {
    const payload = { user };
    console.log('payload', payload);
    const token = Token.createToken(payload, 'secretToken', 'tokenLife');
    const refreshToken = Token.createToken(
      payload,
      'refreshTokenSecret',
      'refreshTokenLife'
    );
    res.status(200).json({ token, refreshToken });
  }

  static auth(req, res) {
    const { login, password } = req.body;
    User.findOne({ login })
      .then((user) => {
        if (!user) {
          return res.sendStatus(404);
        }
        AuthController.checkPassword(password, user.password)
          .then((result) => {
            if (!result) {
              return res.sendStatus(403);
            }
            return AuthController.authCreateToken(user, res);
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static refreshToken(req, res) {
    const { refreshToken } = req.body;
    Token.verifyToken(refreshToken, 'refreshTokenSecret', (err, decoded) => {
      if (err) {
        return res.status(403).json('Invalid token provided');
      }
      AuthController.authCreateToken(decoded.user, res);
    });
  }
}

module.exports = AuthController;
