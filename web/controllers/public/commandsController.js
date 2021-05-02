const Command = require('../../../db/models').Command;

module.exports = {
  async index(req, res) {
    await Command
      .findAll()
      .then(
        (commands) => {
          return res.locals.app.render(req, res, '/public/commands', {
            moderation: commands.filter(
              (command) => command.category == 'Moderation'),
            cosmetics: commands.filter(
              (command) => command.category == 'Cosmetics'),
            utility: commands.filter(
              (command) => command.category == 'Utility'),
            currency: commands.filter(
              (command) => command.category == 'Currency'),
            memes: commands.filter(
              (command) => command.category == 'Memes'),
            nsfw: commands.filter(
              (command) => command.category == 'NSFW'),
          });
        });
  },

  new(req, res) {
    if(!req.user) return res.redirect('/');
    if (req.user.userID != process.env.OWNER_ID) return res.redirect('/');
    return res.locals.app.render(req, res, '/public/commands/new', req.query);
  },

  async create(req, res) {
    if(!req.user) return res.redirect('/');
    if (req.user.userID != process.env.OWNER_ID) return res.json({ success: false });

    const command = await Command
      .findOne({
        where: {
          name: req.body.name,
        },
      });

    if (!command) {
      const newCommand = Command.create(req.body);

      if (newCommand) {
        return res.json({
          success: true,
        });
      }
      else {
        return res.json({
          success: false,
        });
      }
    }
    else {
      return res.json({
        success: false,
        error: 'Command already exists.',
      });
    }
  },

  async edit(req, res) {
    if(!req.user) return res.redirect('/');
    if (req.user.userID != process.env.OWNER_ID) return res.redirect('/');

    const command = await Command
      .findOne({
        where: {
          id: req.params.id,
        },
      });

    return res.locals.app.render(req, res, '/public/commands/edit', {
      command: command.dataValues,
    });
  },

  async update(req, res) {
    if(!req.user) return res.redirect('/');
    if (req.user.userID != process.env.OWNER_ID) return res.json({ success: false });

    const command = await Command
      .findOne({
        where: {
          id: req.params.id,
        },
      });

    if (command.update(req.body)) {
      return res.json({
        success: true,
      });
    }
    else {
      return res.json({
        success: false,
      });
    }
  },

  async destroy(req, res) {
    if(!req.user) return res.redirect('/');
    if (req.user.userID != process.env.OWNER_ID) return res.json({ success: false });

    const command = await Command
      .findOne({
        where: {
          id: req.params.id,
        },
      });

    if (command) {
      command.destroy();
      return res.json({
        success: true,
      });
    }
    else {
      return res.json({
        success: false,
      });
    }
  },
};