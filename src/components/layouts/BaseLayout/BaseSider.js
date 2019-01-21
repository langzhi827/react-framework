import React, { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
import { routerConfig } from '@/config/router.config';
import { Link, withRouter } from 'react-router-dom';

const { SubMenu } = Menu;
const Sider = Layout.Sider;

// 路由配置path父子关系映射
let routePathMap = {};
const makeRoutePathMap = (routes, parent = '_') => {
    routes.forEach(route => {
        routePathMap[route.path] = parent;
        if (route.routes) {
            makeRoutePathMap(route.routes, route.path);
        }
    });
};
makeRoutePathMap(routerConfig);

class BaseSider extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { match: { path }, location: { pathname } } = this.props;

        const menusData = routerConfig.filter(route => route.path === path)[0].routes || [];

        return <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={[routePathMap[pathname]]}
            >
                {menusData.map(menu => {
                    if (menu.path) {
                        if (menu.routes) {
                            return <SubMenu key={menu.path} title={menu.name}>
                                {menu.routes.map(m => {
                                    return <Menu.Item key={m.path}>
                                        <Link to={m.path}>{m.name}</Link>
                                    </Menu.Item>;
                                })}
                            </SubMenu>;
                        } else {
                            return <Menu.Item key={menu.path}>
                                <Link to={menu.path}>{menu.name}</Link>
                            </Menu.Item>;
                        }
                    }
                })}

            </Menu>
        </Sider>;
    }
}

export default withRouter(BaseSider);