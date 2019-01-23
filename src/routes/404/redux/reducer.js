/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import actionTypes from './actionTypes';

const action_handles = {
    [actionTypes.UPDATE_TITLE]: (state, action) => {
        const title = action.payload;
        return Object.assign({}, state, { title: title });
    },
    [actionTypes.UPDATE_LIST]: (state, action) => {
        const list = action.payload;
        return Object.assign({}, state, { list: list });
    }
};
const initialState = {
    title: '404',
    list: []
};

export default function (state = initialState, action) {
    const handler = action_handles[action.type];
    return handler ? handler(state, action) : state;
}

