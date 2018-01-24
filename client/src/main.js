/**
 *  Author: harry.lang
 *  Date: 2017/11/17
 *  Description: Created by harrylang on 2017/11/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import routes from './routes';

// 公共样式部分
import 'normalize.css';
import './assets/index.less';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);

// 设置所有模块接受热更新
if (module.hot) {
    module.hot.accept();
}