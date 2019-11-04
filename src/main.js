import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import router from '@/config/router.config';

// 公共样式部分
import 'normalize.css';
import './assets/index.less';

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('root')
);

// 设置所有模块接受热更新
if (module.hot) {
    module.hot.accept();
}