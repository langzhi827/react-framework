import React from 'react';
import { DatePicker, Button, Dropdown, Menu, Icon } from 'antd';
import CSSModules from 'react-css-modules';

import styles from '../assets/app.less';
import Title from './Title';
import Table from './Table';

const App = ({ app, updateTitle, children }) => {

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
            </Menu.Item>
        </Menu>
    );

    return <div styleName="app">
        {children}
        <Title>{app.title}</Title>
        <DatePicker />
        <Button type="primary">Primary</Button>
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
                Hover me <Icon type="down" />
            </a>
        </Dropdown>

        <div styleName="img" onClick={() => { updateTitle('app-' + (+new Date)); }}></div>
        <Table list={app.list}></Table>
    </div>;
};

export default CSSModules(App, styles);