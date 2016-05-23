import React from 'react';
import Switch from 'react-bootstrap-switch';
import Annyang from 'annyang';

import "./speech.css";

class VoiceModule extends React.Component {
	constructor(props) {
		super(props);
	}

	setVoiceStep(step) {
		console.log(step);
		this.props.onVoiceSearch(step);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	componentDidMount() {
		if (annyang) {
			let commands = {
				'play from the beginning': this.setVoiceStep.bind(this, 'beginning'),
				'go to step one': this.setVoiceStep.bind(this, 0),
				'go to step two': this.setVoiceStep.bind(this, 1),
				'go to step three': this.setVoiceStep.bind(this, 2),
				'pause video': this.setVoiceStep.bind(this, 'pause'),
				'play video': this.setVoiceStep.bind(this, 'play')
			};

			annyang.addCommands(commands);
		}
	}

	toggleVoiceSearch(event, state) {
		let voiceState = annyang.isListening() ? false : true;
		if (voiceState) {
			annyang.start();
		} else {
			annyang.pause();
		}
	}

	render() {
		return (
			<div className='voice-module'>
				<div className='microphone'></div>
				<Switch onChange={this.toggleVoiceSearch.bind(this)} state={false} />
			</div>
		);
	}
}

export default VoiceModule;
