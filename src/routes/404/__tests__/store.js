
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from '../redux/reducer';
import thunk from 'redux-thunk';

export const initialState = {
    noMatch: {
        title: '404',
        list: []
    }
}

const middleware = [thunk];
const store = createStore(
    combineReducers({
        noMatch: reducer
    }),
    initialState,
    applyMiddleware(...middleware)
);

export default store;
