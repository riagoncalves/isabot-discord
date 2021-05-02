import React from 'react';
import { Layout } from '../../../components/public';
import save from '../../../assets/images/save.svg';

export default class CommandsEdit extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
      pageProps.command = query.command;
    }
    return pageProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      command: props.command,
    };
  }

  handleSubmit(e, id) {
    fetch(`/commands/${id}/update`, {
      method: 'PUT',
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
      command: this.state.command,
    };

    return (
      <Layout user={props.user} title={`Edit ${props.command.name}`}>
        <section className="shinobu-commands_new">
          <form onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit(e, props.command.id);
          }}>
            <div className="form-group">
              <label className="info-md info-white" htmlFor="name">Name</label>
              <input id="name" type="text" name="name" defaultValue={props.command.name}/>
            </div>
            <div className="form-group">
              <label className="info-md info-white" htmlFor="description">Description</label>
              <input id="description" type="textarea" name="description" defaultValue={props.command.description}/>
            </div>
            <div className="form-group">
              <label className="info-md info-white" htmlFor="usage">Usage</label>
              <input id="usage" type="textarea" name="usage" defaultValue={props.command.usage}/>
            </div>
            <div className="form-group">
              <label className="info-md info-white" htmlFor="aliases">Aliases</label>
              <input id="aliases" type="text" name="aliases" placeholder="a,b,c,d" defaultValue={props.command.aliases.join(',')}/>
            </div>
            <div className="form-group">
              <label className="info-md info-white" htmlFor="category">Category</label>
              <select name="category" id="category" defaultValue={props.command.category}>
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
