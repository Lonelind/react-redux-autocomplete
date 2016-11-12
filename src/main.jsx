import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from 'store.jsx';

import AppContainer from 'containers/App.jsx';
import ExampleContainer from 'containers/Example.jsx';

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={AppContainer}>
				<IndexRoute component={ExampleContainer} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
