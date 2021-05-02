const express = require('express');
const nextApp = require('next');
const client = require('../bot/client');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const cookieSession = require('cookie-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const scopes = ['identify', 'email', 'guilds', 'guilds.join'];
const User = require('../db/models').User;
const initialDonuts = 2000;
let discordProfile = {};

passport.use(
  new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: scopes,
  },
  async (accessToken, refreshToken, profile, cb) => {
    discordProfile = profile;

    let user = await User
      .findOne({ where:
        {
          userID: profile.id,
        },
      });

    if (!user) {
      user = await User
        .create({
          userID: profile.id,
          username: `${profile.username}#${profile.discriminator}`,
          photo: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=512`,
          donuts: initialDonuts,
          dailyCheck: new Date(new Date().setDate(new Date().getDate() - 1)),
        });
    }
    return cb(null, user);
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const app = nextApp({
  dev,
  dir: './web/app',
});

const handle = app.getRequestHandler();

module.exports = () => {
  app.prepare().then(() => {
    const server = express();

    server.use(cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY],
    }));

    server.use(passport.initialize());
    server.use(passport.session());

    server.use(express.json());
    server.use(express.urlencoded({
      extended: true,
    }));

    server.use((req, res, next) => {
      res.locals.app = app;
      res.locals.discordProfile = discordProfile;
      next();
    });

    server.use('/', require('./routes/public'));
    server.use('/admin', require('./routes/admin'));

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
      console.log(`${client.user.tag} web interface initiated!`);
    });
  });
};
