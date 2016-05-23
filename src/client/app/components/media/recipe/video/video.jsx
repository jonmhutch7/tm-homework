import React from 'react';
import ReactPlayer from 'react-player'

import './video.css';

class VideoComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isLoading: false};
	}

	componentWillReceiveProps(props) {
		let selectedStep = props.video.selectedStep;
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
		this.setState({ playing: !this.state.playing });
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
							<div className="progress-container">
								<input
									type='range' min={0} max={1} step='any'
									value={this.state.played}
									onMouseDown={this.onSeekMouseDown.bind(this)}
									onChange={this.onSeekChange.bind(this)}
									onMouseUp={this.onSeekMouseUp.bind(this)}
								/>
								<progress className='played' max={1} value={this.state.played} />
								<progress className='loading' max={1} value={this.state.loaded} />
								<div className="step-count">
									{ 
										steps.map(function(step, index) {
											let elem = document.getElementsByClassName('step-count');
											let width = elem.length ? elem[0].offsetWidth : 0;
											let time = step.time * 100;
											let position = ((time * width) / 100);
											let stepPosition = {'left': position};
											return <span key={index} style={stepPosition}></span>
										})
									}
								</div>
							</div>
							<div className='buttons'>
								<button onClick={this.togglePlay.bind(this)} className={this.state.playing ? 'pause' : 'play'}></button>
							</div>
						</div>
					</div>
				: 
					<div>Loading</div>
				}
			</div>
		);
	}
}

export default VideoComponent;
