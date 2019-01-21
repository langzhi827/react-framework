import React, { PureComponent } from 'react';
import { Breadcrumb } from 'antd';
import { routerConfig } from '@/config/router.config';
import { withRouter, Link } from 'react-router-dom';

// 处理path与breadcrumbName的映射关系
let breadcrumbNameMap = {};
const makeBreadcrumbNameMap = (routes) => {
    routes.forEach(route => {
        if (route.breadcrumbName) {
            breadcrumbNameMap[route.path] = route.breadcrumbName;
        }
        if (route.routes) {
            makeBreadcrumbNameMap(route.routes);
        }
    });
};
makeBreadcrumbNameMap(routerConfig);

class BaseBreadcrumb extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { location: { pathname } } = this.props;

        const pathSnippets = pathname.split('/').filter(name => name);

        const breadcrumbItems = pathSnippets.map((snippet, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return <Breadcrumb.Item key={url}>
                {
                    url === pathname
                        ? breadcrumbNameMap[url]
                        : <Link to={url}>
                            {breadcrumbNameMap[url]}
                        </Link>}
            </Breadcrumb.Item>;
        });

        return <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbItems}
        </Breadcrumb>;
    }
}

export default withRouter(BaseBreadcrumb);