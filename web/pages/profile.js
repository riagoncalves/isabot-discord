import React from 'react';
import Layout from '../components/layout';
import Router from 'next/router';

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

		return (
			<Layout user={props.user}>
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
						<div className="flex">
							<div className="shinobu-profile-details-level">
								<p className="info-xlg info-white tal info-bold">Level {props.user.level}</p>
								<span className="shinobu-profile-details-level-bar">
									<span className="shinobu-profile-details-level-bar-completed" style={{ width: `${(props.user.experience / (props.user.level * 100)) * 100}%` }}></span>
								</span>
								<div className="shinobu-profile-details-level-experience">
									<p className="info-gray info-sl tal"><span className="info-sbold info-white">{props.user.experience}</span> / {props.user.level * 100}</p>
								</div>
							</div>
							<div className="shinobu-profile-details-customize">
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