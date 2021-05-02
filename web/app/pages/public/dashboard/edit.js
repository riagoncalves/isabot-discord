import React from 'react';
import { Layout } from '../../../components/public';

export default class Guild extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
      pageProps.guild = query.guild;
      pageProps.dbGuild = query.dbGuild;
    }
    return pageProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      guild: props.guild,
      dbGuild: props.dbGuild,
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      guild: this.state.guild,
      dbGuild: this.state.dbGuild,
    };

    return (
      <Layout user={props.user} title={`Edit ${props.guild.name}`}>
        <section className="shinobu-guild">
          <div className="text-center">
            <form method="POST" action={`/dasboard/${props.dbGuild.id}/edit`}>
              <input type="text" value={props.dbGuild.prefix} name="prefix"/>
            </form>
          </div>
        </section>
      </Layout>
    );
  }
}
