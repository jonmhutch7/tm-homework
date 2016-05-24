import React from 'react';

import "./controls.css";

class ControlModule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let props = this.props;
		let isLoading = this.props.steps ? true : false;
		return (
			<div className="progress-container">
				{ isLoading ?
					<div>
						<input
							type='range' min={0} max={1} step='any'
							value={props.played}
							onMouseDown={props.mouseDown.bind(this)}
							onChange={props.change.bind(this)}
							onMouseUp={props.mouseUp.bind(this)}
						/>
						<progress className='played' max={1} value={props.played} />
						<progress className='video-load' max={1} value={props.loaded} />
						<div className="step-count">
							{ 
								props.steps.map(function(step, index) {
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
				: 
					<div className='loading'></div>
				}
			</div>
		);
	}
}

export default ControlModule;