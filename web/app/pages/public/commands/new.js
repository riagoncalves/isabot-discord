import React from 'react';
import { Layout } from '../../../components/public';
import save from '../../../assets/images/save.svg';

export default class CommandsNew extends React.Component {
  static async getInitialProps({ req }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
    }
    return pageProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/commands/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: e.target.querySelector('input[name=name]').value,
        description: e.target.querySelector('input[name=description]').value,
        usage: e.target.querySelector('input[name=usage]').value,
        aliases: e.target.querySelector('input[name=aliases]').value.split(','),
        category: e.target.querySelector('select[name=category]').value,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if(data.success == true) return window.location.assign('/commands');
      })
      .catch(error => console.log(error));
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
    };

    return (
      <Layout user={props.user} title="New Command">
        <section className="shinobu-commands_new">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="info-md info-white" htmlFor="name">Name</label>
              <input id="name" type="text" name="name"/>
            </div>
            <div className="form-group">
              <label className="info-md info-white" htmlFor="description">Description</label>
              <input id="description" type="textarea" name="description"/>
            </div>
            <div className="form-group">
              <label className="info-md info-white" htmlFor="usage">Usage</label>
              <input id="usage" type="textarea" name="usage"/>
            </div>
            <div className="form-group">
              <label className="info-md info-white" htmlFor="aliases">Aliases</label>
              <input id="aliases" type="text" name="aliases" placeholder="a,b,c,d"/>
            </div>
            <div className="form-group">
              <label className="info-md info-white" htmlFor="category">Category</label>
              <select name="category" id="category">
                <option selected disabled>Choose a Category</option>
                <option value="Moderation">Moderation</option>
                <option value="NSFW">NSFW</option>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Utility">Utility</option>
                <option value="Currency">Currency</option>
                <option value="Memes">Memes</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="shinobu-commands_new-save">
                <img src={save} className="shinobu-commands_new-save-img" />
                <p className="shinobu-commands_new-save-label info-xsl info-white">Save</p>
              </button>
            </div>
          </form>
        </section>
      </Layout>
    );
  }
}
