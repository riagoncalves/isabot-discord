const User = require('../../../db/models').User;
const Background = require('../../../db/models').Background;
const UserBackground = require('../../../db/models').UserBackground;

module.exports = {
  async index(req, res) {
    if(!req.user) return res.redirect('/');
    const background = await Background
      .findOne({
        where: {
          id: req.user.BackgroundId,
        },
      });

    return res.locals.app.render(req, res, '/public/profile', {
      background: background ? background.link : process.env.DEFAULT_PFP,
    });
  },

  async edit(req, res) {
    if(!req.user) return res.redirect('/');

    const background = await Background
      .findOne({
        where: {
          id: req.user.BackgroundId,
        },
      });

    const userbackgrounds = await UserBackground
      .findAll(({
        where:
        {
          UserId: req.user.id,
        },
        include: ['Background'],
      }));

    return res.locals.app.render(req, res, '/public/profile/edit', {
      background: background ? background.link : process.env.DEFAULT_PFP,
      inventory: userbackgrounds,
    });
  },

  async update(req, res) {
    if(!req.user) return res.json({ success: false });

    const user = await User
      .findOne({
        where: {
          id: req.user.id,
        },
      });

    if (
      user.update({
        title: req.body.title,
        color: req.body.color,
        BackgroundId: parseInt(req.body.BackgroundId),
      })) {
      req.login(user, function(err) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
    }
  },
};