import { combineReducers } from 'redux';
import store from './index';

// 辅助reducer,这里只用做默认占位,确保store默认存在一个reducer
const action_handles = {};
const initialState = {};
const helpReducer = (state = initialState, action) => {
    const handler = action_handles[action.type];
    return handler ? handler(state, action) : state;
};

/**
 * 合并多个reducers
 * @param asyncReducers
 * @returns {*}
 */
export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        helpReducer,
        ...asyncReducers
    });
};

/**
 * 在store中注入并替换原有reducer
 * @param store
 * @param key   reducer名称
 * @param reducer
 */
export const injectReducer = ({ key, reducer }) => {
    store.asyncReducers[key] = reducer;
    // replaceReducer：替换 store 当前用来计算 state 的 reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};