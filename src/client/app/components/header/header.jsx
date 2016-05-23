import React from 'react';
import Switch from 'react-bootstrap-switch';

import VoiceModule from './speech/speech.jsx';

import "./header.css";

class HeaderComponent extends React.Component {
	render() {
		return (
			<header>
				<img src='https://d37dagtz5y7rwi.cloudfront.net/dist/images/logos/tm-logo-8e6bed060c.png' />
				<VoiceModule onVoiceSearch={this.props.onVoiceSearch} />
			</header>
		);
	}
}

export default HeaderComponent;