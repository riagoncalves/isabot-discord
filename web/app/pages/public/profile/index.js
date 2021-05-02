import React from 'react';
import { Layout } from '../../../components/public';
import Router from 'next/router';
import donut from '../../../assets/images/donut.png';
import edit from '../../../assets/images/edit.svg';

export default class Profile extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
      pageProps.background = query.background;
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
      background: props.background,
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      background: this.state.background,
    };

    function numFormatter(num) {
      return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num);
    }

    return (
      <Layout user={props.user} title="Profile">
        <section className="shinobu-profile">
          <span className="shinobu-profile-background" style={{ backgroundImage: `url(${props.background})` }}></span>
          <div className="shinobu-profile-card container">
            <img src={props.user.photo} />
            <div className="shinobu-profile-card-info">
              <h2 className="title-sm title-white tal">{props.user.username.split('#')[0]}</h2>
              <p className="info-sl info-white tal">{props.user.title}</p>
            </div>
          </div>
          <div className="shinobu-profile-details container">
            <a href='/profile/edit' className="shinobu-profile-details-edit">
              <img src={edit} className="shinobu-profile-details-edit-img" />
              <p className="shinobu-profile-details-edit-label info-xsl info-white">Edit profile</p>
            </a>
            <div className="shinobu-profile-details-container flex">
              <div className="shinobu-profile-details-info flex flex-col flex-1">
                <div className="shinobu-profile-details-info-level">
                  <p className="info-xlg info-white tal info-bold">Level {props.user.level}</p>
                  <span className="shinobu-profile-details-info-level-bar">
                    <span className="shinobu-profile-details-info-level-bar-completed" style={{ width: `${(props.user.experience / (props.user.level * 100)) * 100}%` }}></span>
                  </span>
                  <div className="shinobu-profile-details-info-level-experience">
                    <p className="info-gray info-sl tar"><span className="info-sbold info-white">{props.user.experience}</span> / {props.user.level * 100}</p>
                  </div>
                </div>
                <div className="shinobu-profile-details-info-currency">
                  <h3 className="title-white title-xsl tal">Currency</h3>
                  <div className="flex items-center shinobu-profile-details-info-currency-single">
                    <img src={donut} className="donuts-img" />
                    <p className="info-gray info-xsl info-sbold tal donuts-label">Donuts:</p>
                    <p className="info-white info-xsl info-sbold tal">{numFormatter(props.user.donuts)}</p>
                  </div>
                </div>
                <div className="shinobu-profile-details-info-rep">
                  <h3 className="title-white title-xsl tal">Reputation</h3>
                  <div className="flex items-center shinobu-profile-details-info-rep-single">
                    <p className="info-white info-xsl info-sbold tal">{props.user.rep}</p>
                  </div>
                </div>
              </div>
              <div className="shinobu-profile-details-customize flex-1">
                <div className="shinobu-profile-details-customize-background">
                  <p className="info-md info-white info-sbold">Background</p>
                  <img src={props.background} />
                </div>
                <div className="shinobu-profile-details-customize-color">
                  <p className="info-md info-white info-sbold">Color</p>
                  <span style={{ backgroundColor: props.user.color }}></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
