import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import puglogo from '../images/pug.svg';

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { header } = this.props;
		return (
			<Fragment>
				<Content header={header} />
			</Fragment>
		);
	}
}

const Content = ({ header }) => {
	const github = 'https://github.com/darknblack/';
	const repo = 'https://github.com/darknblack/react-webpack';

	return pug`
		#pug.child
			img(src=puglogo alt="hey")

			h3.upperCase #{header.toUpperCase()}

			div
				| Pug cheat sheet #[a(href="https://pugjs.org/language/attributes.html" target="_blank") pugjs.org/language/attributes.html] |
				| #[a(href="https://devhints.io/pug", target="_blank") devhints.io/pug]

			div Star or fork this repo @ #[a(href=repo, target="_blank") Github.com/darknblack/react-webpack]

			div Follow me @ #[a(href=github, target="_blank") Github.com/darknblack]
	`;
};

Body.propTypes = {
	header: PropTypes.string,
};

const mapStateToProps = state => ({
	header: state.header,
});

export default connect(mapStateToProps)(Body);
