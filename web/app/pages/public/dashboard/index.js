import React from 'react';
import { Layout, DashboardGuild } from '../../../components/public';

export default class Dashboard extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
      pageProps.guilds = query.profile.guilds;
      pageProps.botGuilds = query.botGuilds;
    }
    return pageProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      guilds: props.guilds,
      botGuilds: props.botGuilds,
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      guilds: this.state.guilds,
      botGuilds: this.state.botGuilds,
    };

    const hasId = function(guildId) {
      const guilds = Array.from(props.botGuilds.cache.values());
      const ids = [];
      guilds.forEach(guild => {
        ids.push(guild.id);
      });
      return ids.includes(guildId.toString());
    };

    return (
      <Layout user={props.user} title="Dashboard">
        <section className="shinobu-dashboard">
          <div className="text-center">
            <h2 className="title-sm title-white">YOUR SERVERS</h2>
            {props.guilds.map((guild) => (
              guild.owner && <DashboardGuild guild={guild} botGuild={hasId(guild.id)} />
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}
