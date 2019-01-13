import React, { Component } from 'react';
import { Layout } from 'antd';

const Content = Layout.Content;

import BaseHeader from './BasicHeader';
import BaseSider from './BaseSider';
import BaseBreadcrumb from './BaseBreadcrumb';

class BaseLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;

        return <Layout>
            <BaseHeader />
            <Layout>
                <BaseSider />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <BaseBreadcrumb />
                    <Content style={{
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                    }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>;
    }
}

export default BaseLayout;