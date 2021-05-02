module.exports = {
  index(req, res) {
    if(!req.user) return res.redirect('/');
    return res.locals.app.render(req, res, '/admin/dashboard');
  },
};
