/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import constants from '../constants';
import fetch from '../../../utils/fetch';
/**
 * 修改title
 * @param title 新的标题
 * @returns {{type: string, payload: *}}
 */
export function updateTitle(title) {

    return {
        type: constants.UPDATE_TITLE,
        payload: title
    };
}

export function getList(params) {
    return async dispatch => {
        await fetch(env.api.list);
    };
}