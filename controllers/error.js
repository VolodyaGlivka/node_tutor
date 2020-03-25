class ErrorController {
  static error404(_, res) {
    res.status(404).send(`<h1>Page not found</h1>`);
  }
}

module.exports = ErrorController;
