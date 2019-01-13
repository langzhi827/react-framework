import React, { PureComponent } from 'react';
import { Breadcrumb } from 'antd';

class BaseBreadcrumb extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>;
    }
}

export default BaseBreadcrumb;