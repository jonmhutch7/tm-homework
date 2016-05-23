import React from 'react';

import VideoComponent from './video/video.jsx';
import StepsComponent from './steps/steps.jsx';

import "./recipe.css";

class RecipeComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {selectedStep: (this.props.recipe.voiceSearchStep || this.props.recipe.voiceSearchStep === 0) ? this.props.recipe.voiceSearchStep : null}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({selectedStep: nextProps.recipe.voiceSearchStep})
	}

	setStep(step) {
		this.setState({selectedStep: step});
	}

	formatSteps(recipeJSON, duration) {
		let stepsObj = {steps: [], ingredients: recipeJSON.ingredients};
		let stepsLength = recipeJSON.steps.length;
		let durationAvg = duration / stepsLength;
		recipeJSON.steps.map(function(step, index) {
			let time = (index + 1) * durationAvg;
			let timeFraction = (Math.round(time) * 100) / duration;
			let stepObj = {'step': step, 'time': ((timeFraction - 10) / 100)};

			stepsObj.steps.push(stepObj);
		});

		return stepsObj;
	}

	render() {
		let recipe = this.props.recipe.recipe ? this.props.recipe.recipe.fields : null;
		let steps = recipe ? this.formatSteps(recipe.recipeJSON[0], recipe.landscapeAssetClean.fields.duration) : null;
		let video = recipe ? {videoUrl: recipe.landscapeAssetClean.fields.awsOriginal, title: recipe.title, description: recipe.description, steps: steps.steps, selectedStep: this.state.selectedStep} : null;
		return (
			<main className='recipe-container'>
				<VideoComponent video={video} />
				<StepsComponent steps={steps} setStep={this.setStep.bind(this)} />
			</main>
		);
	}
}

export default RecipeComponent;
