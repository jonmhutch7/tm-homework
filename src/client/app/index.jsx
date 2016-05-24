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

		client.getEntries({'content_type': 'video','fields.publishDate[lte]': new Date().toISOString(), 'fields.series[exists]': false, 'order': '-fields.publishDate,sys.id',}).then(function(data) {
			self.filterData(data.items, self);
		});
	}

	filterData(data, self) {
		let recipes = [];
		data.map(function(obj) {
			let recipe = obj.fields;
			if (recipe.recipeJSON && recipe.landscapeAssetClean && recipe.landscapeThumbnail) {
				recipes.push(obj);
			}
		});

		let random = Math.floor(Math.random() * recipes.length) + 1;
		let recipe = recipes[random - 1];

		self.setState({'recipe': recipe, voiceSearchStep: null});
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
