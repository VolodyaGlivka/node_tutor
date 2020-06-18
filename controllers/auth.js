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
    const login = user.login;
    const token = Token.createToken(payload, 'secretToken', 'tokenLife');
    const refreshToken = Token.createToken(
      payload,
      'refreshTokenSecret',
      'refreshTokenLife'
    );
    const newToken = new TokenModel({
      login,
      status: 'Logged in',
      token: token,
      refreshToken: refreshToken,
    });
    TokenModel.findOne({ login })
      .then((userToken) => {
        if (!userToken) {
          newToken
            .save()
            .then(() => {
              res.status(200).json({ token });
            })
            .catch((err) => {
              res.send(err);
            });
        } else {
          TokenModel.findOneAndUpdate(
            { login },
            {
              login,
              status: 'Logged in',
              token: token,
              refreshToken: refreshToken,
            }
          )
            .then(() => {
              res.status(200).json({ token });
            })
            .catch((err) => {
              res.send(err);
            });
        }
      })
      .catch((err) => {
        res.send(err);
      });
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
}

module.exports = AuthController;
