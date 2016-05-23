import React from 'react';

import './gallery.css';

class GalleryComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let recipes = this.props.recipes ? this.props.recipes : null;
		let isLoading = this.props.recipes ? true : false;
		return (
			<div className="gallery-container">
				{ isLoading ? 
					<div>
						<h2>Browse More Recipes</h2>
						<ul>
							{
								recipes.map(function(recipe, index) {
									recipe = recipe.fields;
									let thumbnail = recipe.landscapeThumbnail.fields.file.url;
									let title = recipe.title;
									return <li key={index}><img src={'http:' + thumbnail} /><div>{title}</div></li>
								})
							}
						</ul>
					</div>
				: 
					<div>Loading</div>
				} 
			</div>
		);
	}
}

export default GalleryComponent;
