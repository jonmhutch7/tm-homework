import React from 'react';
import {render} from 'react-dom';

import HeaderComponent from './components/header/header.jsx';
import RecipeComponent from './components/recipe/recipe.jsx';

import contentful from 'contentful';

import "./main.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {voiceSearchStep: null, recipe: null};
	}

	componentWillMount() {
		if (!this.state.recipe) {
			this.retrieveData();
		}
	}

	onVoiceSearch(step) {
		this.setState({voiceSearchStep: step})
	}

	retrieveData() {
		const config = { "accessToken": "b46f5d27b49f0ae7e9bd8e8d0a645d2c220eefe60f64d09a10ce12e4d429ce43", "space": "pxqrocxwsjcc" };
		const client = contentful.createClient(config);

		let self = this;

		client.getEntries({'content_type': 'video', 'fields.slug': 'chicken-alfredo', 'include': 2}).then(function(data) {
			self.setState({'recipe': data.items[0], voiceSearchStep: null});
		});
	}

	filterData(data, self) {
		let recipe = data.items[0];

	}

	render () {
		let stepLength = this.state.recipe ? this.state.recipe.fields.recipeJSON[0].steps.length : null;
		return (
			<div>
				<HeaderComponent onVoiceSearch={this.onVoiceSearch.bind(this)} stepLength={stepLength}/>
				<RecipeComponent recipe={this.state.recipe} voiceSearchStep={this.state.voiceSearchStep}/>
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));
