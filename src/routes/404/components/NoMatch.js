/*
 * @Author: harry.lang 
 * @Date: 2018-03-20 14:54:22 
 * @Last Modified by: harry.lang
 * @Last Modified time: 2019-01-02 15:32:17
 */
import React, { PureComponent } from 'react';
import { DatePicker, Dropdown, Menu, Icon } from 'antd';
import CSSModules from 'react-css-modules';

import styles from '../assets/noMatch.css';
import img from '../assets/images/hehe.png';

class NoMatch extends PureComponent {

    componentDidMount() {
        const { getList } = this.props;
        getList();
    }

    changeTitle() {
        this.props.updateTitle('404-' + (+new Date));
    }

    render() {
        const { nomatch } = this.props;

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

        return <div styleName="no-match">
            <h2>{nomatch.title}</h2>

            <DatePicker />
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    Hover me <Icon type="down" />
                </a>
            </Dropdown>

            <img styleName="img" src={img} alt="404" onClick={this.changeTitle.bind(this)} />

            <h3>No match for <code>{this.props.location.pathname}</code></h3>
        </div>;
    }
}

export default CSSModules(NoMatch, styles);
