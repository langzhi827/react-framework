/**
 * 根据path设置webpackChunkName
 * @param {*} route 
 */
function handleChunkName(route) {
    if (route.path === '/') {
        const path = route.component.split('/');
        return path[path.length - 1];
    }
    return route.path.replace(/^\//, '').split('/').join('-');
}

/**
 * 处理route
 * @param {*} route 
 */
function createRoute(route) {
    const routes = route.routes || [];

    if (route.from && route.to) {
        return `<Redirect from="${route.from}" to="${route.to}" />`;
    } else if (route.dynamic === false) {
        return `
            <Route path="${route.path}" render={props => {
                const RouteComponent = require('${route.component}').default;

                return <RouteComponent {...props}>
                    ${routes.length > 0 ? createRoutes(routes) : ''}
                </RouteComponent>;
            }} />
        `;
    } else {
        return `
            <Route path="${route.path}" component={
                Loadable({
                    loader: () => import(/* webpackChunkName: "${handleChunkName(route)}" */'${route.component}'),
                    loading: () => Loading,
                    render(loaded, props) {
                        const RouteComponent = loaded.default;
                        return <RouteComponent {...props}>
                            ${routes.length > 0 ? createRoutes(routes) : ''}
                        </RouteComponent>;
                    }
                })
            } />
        `;
    }
}

function createRoutes(routes) {
    const RouteComponents = routes.reduce((components, route) => {
        return components += createRoute(route);
    }, '');

    return `
        <Switch>
            ${RouteComponents}
        </Switch>
    `;
}

module.exports = function (content) {
    const routerConfig = this.exec(content, 'router.config.js');

    return `/* eslint-disable */

    import React from 'react';
    import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
    import Loadable from 'react-loadable';
    import Loading from '@/components/Loading';

    export const routerConfig = ${JSON.stringify(routerConfig)};

    export default <Router>
        ${createRoutes(routerConfig)}
    </Router>;
`;;
};