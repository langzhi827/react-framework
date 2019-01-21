import React, { PureComponent } from 'react';
import { Layout, Menu } from 'antd';

const Header = Layout.Header;

class BasicHeader extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <Header className="header">
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">nav 1</Menu.Item>
            </Menu>
        </Header>;
    }
}

export default BasicHeader;