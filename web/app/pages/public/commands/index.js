import React from 'react';
import { Layout, CommandsTable } from '../../../components/public';

export default class Commands extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
    }

    if(query) {
      pageProps.moderation = query.moderation;
      pageProps.cosmetics = query.cosmetics;
      pageProps.utility = query.utility;
      pageProps.currency = query.currency;
      pageProps.memes = query.memes;
      pageProps.nsfw = query.nsfw;
    }

    return pageProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      moderation: props.moderation,
      cosmetics: props.cosmetics,
      utility: props.utility,
      currency: props.currency,
      memes: props.memes,
      nsfw: props.nsfw,
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      moderation: this.state.moderation,
      cosmetics: this.state.cosmetics,
      utility: this.state.utility,
      currency: this.state.currency,
      memes: this.state.memes,
      nsfw: this.state.nsfw,
    };

    return (
      <Layout user={props.user} title="Commands">
        <section className="shinobu-commands">
          {props.user && props.user.userID == process.env.ownerID &&
          <div className="flex shinobu-commands-header">
            <a href='/commands/new' className="btn-primary btn-sl">New Command</a>
          </div>}
          <div className="flex shinobu-commands-container">
            <div className="shinobu-commands-navigation">
              <h3 className="title-sm title-white tal">Categories</h3>
              <nav>
                {props.moderation.length > 0 && <a className="info-sl info-gray info-bold tal" href="#" data-control="scroll" data-scroll="Moderation">Moderation</a>}
                {props.cosmetics.length > 0 && <a className="info-sl info-gray info-bold tal" href="#" data-control="scroll" data-scroll="Cosmetics">Cosmetics</a>}
                {props.utility.length > 0 && <a className="info-sl info-gray info-bold tal" href="#" data-control="scroll" data-scroll="Utility">Utility</a>}
                {props.currency.length > 0 && <a className="info-sl info-gray info-bold tal" href="#" data-control="scroll" data-scroll="Currency">Currency</a>}
                {props.memes.length > 0 && <a className="info-sl info-gray info-bold tal" href="#" data-control="scroll" data-scroll="Memes">Memes</a>}
                {props.nsfw.length > 0 && <a className="info-sl info-gray info-bold tal" href="#" data-control="scroll" data-scroll="NSFW">NSFW</a>}
              </nav>
            </div>
            <div className="shinobu-commands-list">
              {props.moderation.length > 0 && <CommandsTable user={props.user} title="Moderation" rows={props.moderation}/>}
              {props.cosmetics.length > 0 && <CommandsTable user={props.user} title="Cosmetics" rows={props.cosmetics}/>}
              {props.utility.length > 0 && <CommandsTable user={props.user} title="Utility" rows={props.utility}/>}
              {props.currency.length > 0 && <CommandsTable user={props.user} title="Currency" rows={props.currency}/>}
              {props.memes.length > 0 && <CommandsTable user={props.user} title="Memes" rows={props.memes}/>}
              {props.nsfw.length > 0 && <CommandsTable user={props.user} title="NSFW" rows={props.nsfw}/>}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
