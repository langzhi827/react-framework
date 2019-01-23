/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import actionTypes from './actionTypes';
import fetch from '@/utils/fetch';
import api from '@/config/api';

/**
 * 修改title
 * @param title 新的标题
 * @returns {{type: string, payload: *}}
 */
export function updateTitle(title) {
    return {
        type: actionTypes.UPDATE_TITLE,
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
        const result = await fetch(api.list + '?test=1', {
            params: {
                test1: 2
            }
        });
        dispatch(updateList(result));
    };
}

/**
 * 更新列表
 * @param list
 * @returns {{type: string, payload: *}}
 */
export function updateList(list) {
    return {
        type: actionTypes.UPDATE_LIST,
        payload: list
    };
}