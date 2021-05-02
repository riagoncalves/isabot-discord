module.exports = {
  index(req, res) {
    res.setHeader('Content-Type', 'text/html');
    return res.locals.app.render(req, res, '/public/home', req.query);
  },
};