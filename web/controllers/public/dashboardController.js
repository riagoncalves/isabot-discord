const client = require('../../../bot/client');
const Guild = require('../../../db/models').Guild;

module.exports = {
  index(req, res) {
    if(!req.user) return res.redirect('/');
    return res.locals.app.render(req, res, '/public/dashboard',
      {
        profile: res.locals.discordProfile,
        botGuilds: client.guilds,
      },
    );
  },

  async show(req, res) {
    if(!req.user) return res.redirect('/public/dashboard');
    let guildConfirm = false;

    client.guilds.cache.forEach(guild => {
      if (guild.id == req.params.guildID && req.user.userID == guild.ownerID) {
        guildConfirm = true;
      }
    });

    if(!guildConfirm) return res.redirect('/public/dashboard');
    const guild = client.guilds.cache.filter(
      (sGuild) => sGuild.id == req.params.guildID);

    const dbGuild = await Guild
      .findOne({
        where: {
          guildID:req.params.guildID,
        },
      });

    if (!guild) return res.status(404);
    if (!dbGuild) return res.status(404);

    return res.locals.app.render(req, res, '/public/dashboard/edit',
      {
        profile: res.locals.discordProfile,
        guild: Array.from(guild.values())[0],
        dbGuild: dbGuild.dataValues,
      },
    );
  },
};
