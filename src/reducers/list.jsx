import initialState from 'store.initial.jsx';
import { GET_LIST } from 'constants/list.jsx';

export function list(state = initialState.list, action) {
	switch (action.type) {
		case GET_LIST:
			return Object.keys(action.data)
				.map((code) => ({
					code,
					name: action.data[code],
				}))
				.sort((a, b) => {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
					return 0;
				});

		default:
			return state;
	}
};
