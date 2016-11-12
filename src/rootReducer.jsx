import { combineReducers } from 'redux';

import { list } from 'reducers/list.jsx';
import { country } from 'reducers/country.jsx';

export default combineReducers({
	list,
	country,
});