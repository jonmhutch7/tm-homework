import React from 'react';

import './steps.css';

class StepsComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {active: null};
	}

	loopStep(step) {
		if (step === this.state.active) {
			this.props.setStep('play');
			this.setState({active: null});
		} else {
			this.props.setStep(step);
			this.setState({active: step});
		}
	}

	render() {
		let ingredients = this.props.steps ? this.props.steps.ingredients : [];
		let steps = this.props.steps ? this.props.steps.steps : [];
		let self = this;
		let isLoading = this.props.steps ? true : false;
		return (
			<div className="steps-container">
				{ isLoading ? 
					<div>
						<div className="col-left">
							<h2>Ingredients</h2>
							<ul className='ingredients-list'>
								{
									ingredients.map(function(ingredient, index) {
										return <li key={index}>{ingredient}</li>
									})
								}
							</ul>
						</div>
						<div className="col-right">
							<h2>Steps</h2>
							<ul className='steps-list'>
								{
									steps.map(function(step, index) {
										return <li className={self.state.active === index ? 'active' : ''} onClick={self.loopStep.bind(self, index)} key={index}><span>{step.step}</span></li>
									})
								}
							</ul>
						</div>
					</div>
				: 
					<div className='loading'></div>
				}
			</div>
		);
	}
}

export default StepsComponent;
