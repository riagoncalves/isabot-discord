const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
module.exports = withCSS(
  withSass({
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      });

      return config;
    },
    env: {
      ownerID: process.env.OWNER_ID,
      inviteLink: process.env.INVITE_LINK,
      serverInvite: process.env.SERVER_INVITE,
      googleTag: process.env.G_TAG,
    },
  }),
);
