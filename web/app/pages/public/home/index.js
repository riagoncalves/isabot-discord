import React from 'react';
import { Layout, DiscordBtn, SecundaryBtn } from '../../../components/public';
import Router from 'next/router';

export default class Index extends React.Component {
  static async getInitialProps({ req }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
    }
    return pageProps;
  }

  componentDidMount() {
    Router.beforePopState(({ as }) => {
      location.href = as;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
    };

    return (
      <Layout user={props.user}>
        <section className="shinobu-hero">
          <div className="text-center">
            <h1 className="title-xl title-white">Shinobu</h1>
            <p className="info-lg info-white">Your personal discord assistant</p>
            <div className="btn-container">
              <DiscordBtn/>
              <SecundaryBtn link="/commands" text="Learn more" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
