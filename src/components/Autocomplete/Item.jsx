import React from 'react';
import block from 'bem-cn';

export default class AutocompleteItem extends React.Component {
	static displayName = 'AutocompleteItem';

	constructor(props) {
		super();

		this.block = block(props.className || 'autocomplete');
	}

	render() {
		if (!this.props.query) {
			return (
				<li 
					className={this.block('item')({ selected: this.props.selected })} 
					onClick={this.props.onClick}

				>
					{this.props.label}
				</li>
			);
		}

		const matchStart = this.props.label
			.toLowerCase()
			.indexOf(this.props.query.toLowerCase());

		if (matchStart === -1) {
			return null;
		}

		return (
			<li 
				className={this.block('item')({ selected: this.props.selected })} 
				onClick={this.props.onClick}

			>
				{this.props.label.slice(0, matchStart)}
                <mark className={this.block('query-match')}>
                    {this.props.label.slice(matchStart, matchStart + this.props.query.length)}
                </mark>
                {this.props.label.slice(matchStart + this.props.query.length)}
			</li>
		);
	}
}