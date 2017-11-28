/**
 *  Author: harry.lang
 *  Date: 2017/11/28
 *  Description: Created by harrylang on 2017/11/28.
 *
 *  fetch参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 */
import 'whatwg-fetch';

export default function _fetch(url, options) {
    options = {
        //跨域请求参数
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    };

    if (options.body && typeof options.body == 'object') {
        options.body = JSON.stringify(options.body);
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
                console.log(error);
            }
        }).catch(function (error) {
            console.error("error:", error);
        });
}
