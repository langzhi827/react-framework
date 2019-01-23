/*
 * @Author: harry.lang 
 * @Date: 2018-03-20 14:52:04 
 * @Last Modified by: harry.lang
 * @Last Modified time: 2019-01-23 16:57:27
 */
import React, { PureComponent } from 'react';
import { DatePicker, Button, Dropdown, Menu, Icon } from 'antd';
import CSSModules from 'react-css-modules';

import styles from '../assets/app.less';
import Title from './Title';
import Table from './Table';

class App extends PureComponent {

    changeTitle() {
        this.props.updateTitle('app-' + (+new Date));
    }

    componentDidMount() {
        this.props.getList();
    }

    render() {
        const { app } = this.props;

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
            {this.props.children}
            <Title>{app.title}</Title>
            <DatePicker />
            <Button type="primary">Primary</Button>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    Hover me <Icon type="down" />
                </a>
            </Dropdown>

            <div styleName="img" onClick={this.changeTitle.bind(this)}></div>
            <Table list={app.list}></Table>
        </div>;
    }
}

export default CSSModules(App, styles);