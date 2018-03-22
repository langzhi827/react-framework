/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import constants from '../constants';
import fetch from 'SRC_PATH/utils/fetch';
import api from 'SRC_PATH/config/api';

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

/**
 * 获取列表
 * @param params
 * @returns {Function}
 */
export function getList(params) {
    return async dispatch => {
        //return fetch(ENV.API.LIST).then(function (result) {
        //    dispatch(updateList(result))
        //});
        const result = await fetch(api.list);
        dispatch(updateList(result));
        return result;
    };
}

/**
 * 更新列表
 * @param list
 * @returns {{type: string, payload: *}}
 */
export function updateList(list) {
    return {
        type: constants.UPDATE_LIST,
        payload: list
    };
}