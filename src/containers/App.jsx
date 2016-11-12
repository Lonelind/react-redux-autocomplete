import React from 'react';
import { connect } from 'react-redux';

import { getList } from 'actions/list.jsx';

import 'styles/main.styl';

class AppContainer extends React.Component {
	static displayName = 'AppContainer';

	componentDidMount() {
		this.props.getList();
	}

	render() {
		return (
			<div className="app">
				{this.props.children}
			</div>
		);
	}
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		getList: () => dispatch(getList()),
	})
)(AppContainer);
