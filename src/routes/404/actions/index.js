/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import constants from '../constants';
import fetch from '@/utils/fetch';
import api from '@/config/api';

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
 * 更新列表
 * @param list
 * @returns {{type: string, payload: *}}
 */
export const updateList = (list) => {
    return {
        type: constants.UPDATE_LIST,
        payload: list
    };
};

/**
 * 获取列表
 * @param params
 * @returns {Function}
 */
export const getList = (params) => {
    return async dispatch => {
        const result = await fetch(api.list);
        dispatch(updateList(result));
    };
};
