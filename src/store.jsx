import { createStore } from 'redux';

import initialState from 'store.initial.jsx';
import reducer from 'rootReducer.jsx';

export default createStore(reducer, initialState);