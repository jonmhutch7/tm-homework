import React from 'react';

import RecipeComponent from './recipe/recipe.jsx';

import contentful from 'contentful';

class MediaComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {recipe: null};
	}

	componentWillMount() {
		if (!this.state.recipe) {
			this.retrieveData();
		}
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

	render() {
		return (
			<section>
				<RecipeComponent recipe={this.state.recipe} voiceSearchStep={this.props.voiceSearchStep}/>
			</section>
		);
	}
}

export default MediaComponent;