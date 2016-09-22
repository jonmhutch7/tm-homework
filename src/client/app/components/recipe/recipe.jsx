import React from 'react';

import VideoComponent from './video/video.jsx';
import StepsComponent from './steps/steps.jsx';

import "./recipe.css";

class RecipeComponent extends React.Component {
	let

	constructor(props) {
		super(props);
		this.state = {selectedStep: (this.props.voiceSearchStep || this.props.voiceSearchStep === 0) ? this.props.voiceSearchStep : null, recipeArray: [0, 11000, 15000, 37000, 43000]}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({selectedStep: nextProps.voiceSearchStep})
	}

	setStep(step) {
		this.setState({selectedStep: step});
	}

	formatSteps(recipeJSON, duration) {
		let stepsObj = {steps: [], ingredients: recipeJSON.ingredients};
		let arr =  this.state.recipeArray;
		recipeJSON.steps.map(function(step, index) {
			let time = arr[index]
			let timeFraction = (Math.round(time) * 100) / duration;
			let stepObj = {'step': step, 'time': ((timeFraction) / 100)};

			stepsObj.steps.push(stepObj);
		});

		return stepsObj;
	}

	render() {
		let recipe = this.props.recipe ? this.props.recipe.fields : null;
		let steps = recipe ? this.formatSteps(recipe.recipeJSON[0], recipe.landscapeAsset.fields.duration) : null;
		let video = recipe ? {videoUrl: recipe.landscapeAsset.fields.awsOriginal, title: recipe.title, description: recipe.description, steps: steps.steps, selectedStep: this.state.selectedStep} : null;
		return (
			<main className='recipe-container'>
				<VideoComponent video={video} />
				<StepsComponent steps={steps} setStep={this.setStep.bind(this)} />
			</main>
		);
	}
}

export default RecipeComponent;

