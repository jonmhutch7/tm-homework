import React from 'react';
import {render} from 'react-dom';

import HeaderComponent from './components/header/header.jsx';
import MediaComponent from './components/media/media.jsx';

import "./main.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {voiceSearchStep: null};
	}

	onVoiceSearch(step) {
		this.setState({voiceSearchStep: step})
	}

	render () {
		return (
			<div>
				<HeaderComponent onVoiceSearch={this.onVoiceSearch.bind(this)}/>
				<MediaComponent voiceSearchStep={this.state.voiceSearchStep} />
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));
