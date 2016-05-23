import React from 'react';

import GalleryComponent from './gallery/gallery.jsx';
import RecipeComponent from './recipe/recipe.jsx';

import contentful from 'contentful';

class MediaComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {recipes: []};
	}

	componentWillMount() {
		this.retrieveData();
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

		self.setState({'recipes': recipes});
	}

	render() {
		let random = Math.floor(Math.random() * this.state.recipes.length) + 1
		let recipe = {recipe: this.state.recipes[random - 1], voiceSearchStep: this.props.voiceSearchStep};
		return (
			<section>
				<RecipeComponent recipe={recipe}/>
			</section>
		);
	}
}

export default MediaComponent;