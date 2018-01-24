/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import createStore from './createStore';

// Init store
const initialState = {};
const window = window || global;
const store = createStore(window.__INITIAL_STATE__ || initialState);

export default store;