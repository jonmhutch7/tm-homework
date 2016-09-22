import React from 'react';
import ReactPlayer from 'react-player'

import ControlModule from './controls/controls.jsx';

import './video.css';

class VideoComponent extends React.Component {
	constructor(props) {
		super(props);
		if (props.video) {
			this.state = {selectedStep: props.video.selectedStep};
		} else {
			this.state = {};
		}
	}

	componentWillReceiveProps(props) {
		let selectedStep = props.video.selectedStep;
		this.setState({selectedStep: props.video.selectedStep})
		if ((selectedStep || selectedStep === 0) && (!isNaN(selectedStep))) {
			let stepTime = props.video.steps[selectedStep]['time'];
			this.setState({ playing: true, played: parseFloat(stepTime), loaded: 0, url: props.video.videoUrl });
			this.refs.player.seekTo(parseFloat(stepTime));
		} else if (!selectedStep || isNaN(selectedStep)) {
			let playing = false,
				played = 0,
				loaded = 0;
			if (selectedStep === 'beginning') {
				playing = true;
				played = 0;
				loaded = this.state.loaded;
				this.refs.player.seekTo(parseFloat(0));
			} else if (selectedStep === 'play') {
				playing = true;
				played = this.state.played;
				loaded = this.state.loaded;
			} else if (selectedStep === 'pause') {
				playing = false;
				played = this.state.played;
				loaded = this.state.loaded;
			} else {
				playing = false;
				played = this.state.played ? this.state.played : 0;
				loaded = this.state.loaded ? this.state.loaded : 0;
			}
			this.setState({ 'playing': playing, 'played': played, 'loaded': loaded, url: props.video.videoUrl });
		} 
	}

	togglePlay() {
		this.setState({ playing: !this.state.playing, selectedStep: null });
	}

	playVideo() {
		this.setState({ playing: true });
	}

	stopVideo() {
		this.setState({ playing: false });
	}

	onSeekMouseDown(e) {
		this.setState({ seeking: true })
	}
	onSeekChange(e) {
		this.setState({ played: parseFloat(e.target.value) })
	}
	onSeekMouseUp(e) {
		this.setState({ seeking: false })
		this.refs.player.seekTo(parseFloat(e.target.value))
	}

	onProgress(state) {
		if (!this.state.seeking) {
			this.setState(state)
		}

		let step = this.state.selectedStep;
		if ((step || step === 0) && step !== 'play') {
			let videoStep = this.props.video.steps[step];
			let videoStepTime = videoStep.time;
			let nextStep = step + 1;
			let nextStepTime;
			if (nextStep > (this.props.video.steps.length - 1)) {
				nextStepTime = 0.98;
			} else {
				nextStepTime = this.props.video.steps[nextStep].time;
			}

			if (state.played > nextStepTime) {
				this.refs.player.seekTo(parseFloat(videoStepTime))
			}

		}
	}

	render() {
		let title = this.props.video ? this.props.video.title : null;
		let description = this.props.video ? this.props.video.description : null;
		let steps = this.props.video ? this.props.video.steps : [];
		let isLoading = this.props.video ? true : false;
		return (
			<div className="video-container">
				{ isLoading ? 
					<div>
						<h1>{title}</h1>
						<div className='subtitle'>{description}</div>
						<ReactPlayer
							ref='player'
							url={this.state.url}
							playing={this.state.playing}
							width={'100%'}
							height={'auto'}
							onPlay={this.playVideo.bind(this)}
							onPause={this.stopVideo.bind(this)}
							onEnded={this.stopVideo.bind(this)}
							onProgress={this.onProgress.bind(this)}
						/>
						<div className='controls-container'>
							<div className='buttons'>
								<button onClick={this.togglePlay.bind(this)} className={this.state.playing ? 'pause' : 'play'}></button>
							</div>
							<ControlModule
								played={this.state.played}
								loaded={this.state.loaded}
								mouseDown={this.onSeekMouseDown.bind(this)}
								change={this.onSeekChange.bind(this)}
								mouseUp={this.onSeekMouseUp.bind(this)}
								steps={steps} />
						</div>
					</div>
				: 
					<div className='loading'></div>
				}
			</div>
		);
	}
}

export default VideoComponent;
