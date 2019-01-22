/**
 *  Author: harry.lang
 *  Date: 2017/11/28
 *  Description: Created by harrylang on 2017/11/28.
 *
 *  fetch参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 */
import 'whatwg-fetch';

const handleParams = (params = {}) => {
    return Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
};

export default function _fetch(url, options) {
    options = {
        //跨域请求参数
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    };

    if (options.body && typeof options.body == 'object') {
        options.body = JSON.stringify(options.body);
    }

    if (options.params && typeof options.params == 'object') {
        url += url.indexOf('?') > -1 ? '&' : '?';
        url += handleParams(options.params);
    }

    return fetch(url, options)
        .then(function (response) {
            let status = response.status;

            if (status == '200') {
                if (options.headers['Content-Type'] == 'application/json') {
                    return response.json();
                }
                return response;
            }

        }, function (error) {
            if (process.env.NODE_ENV !== 'production') {
                //console.log(error);
            }
        }).catch(function (error) {
            console.error('error:', error);
        });
}
