import React from 'react';
import Switch from 'react-bootstrap-switch';
import Annyang from 'annyang';

import "./speech.css";

class VoiceModule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {stepLength: 0}
	}

	setVoiceStep(step) {
		console.log(step);
		this.props.onVoiceSearch(step);
	}

	shouldComponentUpdate(nextProps, nextState) {
	    return nextProps.stepLength !== nextState.stepLength;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.stepLength !== this.state.stepLength) {
			this.state.stepLength = nextProps.stepLength;
			this.setupVoice();
		}
	}

	setupVoice() {
		if (annyang && this.state.stepLength) {
			let commands = {
				'play from the beginning': this.setVoiceStep.bind(this, 'beginning'),
				'pause video': this.setVoiceStep.bind(this, 'pause'),
				'play video': this.setVoiceStep.bind(this, 'play')
			};

			for (let i = 0; i < this.state.stepLength; i++) {
				let command = {};
				let step = i + 1;
				command['go to step ' + step] = this.setVoiceStep.bind(this, i);
				annyang.addCommands(command);
			}

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
