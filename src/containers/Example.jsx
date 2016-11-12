import React from 'react';
import { connect } from 'react-redux';

import { selectValue } from 'actions/list.jsx';
import Autocomplete from 'components/Autocomplete/Autocomplete.jsx';
import AutocompleteItem from 'components/Autocomplete/Item.jsx';

class ExampleContainer extends React.Component {
	static displayName = 'ExampleContainer';

	renderListItem(item, index) {
		return (
			<AutocompleteItem label={item.name} value={item.code} key={index} />
		);
	}

	render() {
		return (
			<div className="example">
				<Autocomplete
					selectedValue={this.props.countryCode}
					onValueChange={(value) => this.props.onChangeValue(value)}
					placeholder="Выберите страну"
				>
					{this.props.list.map(this.renderListItem)}
				</Autocomplete>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		list: state.list,
		countryCode: state.country,
	}),
	(dispatch) => ({
		onChangeValue: (value) => dispatch(selectValue('country', value)),
	})
)(ExampleContainer);