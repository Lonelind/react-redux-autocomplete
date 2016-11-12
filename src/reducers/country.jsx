import initialState from 'store.initial.jsx';
import { SELECT_LIST_VALUE } from 'constants/list.jsx';

export function country(state = initialState.country, action) {
	switch (action.type) {
		case SELECT_LIST_VALUE:
			if (action.key === 'country') {
				return action.value;
			}

		default:
			return state;
	}
};
