/**
 *  Author: harry.lang
 *  Date: 2018/1/18
 *  Description: Created by harrylang on 2018/1/18.
 */
import React from 'react';
import {Route, Redirect,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loading';

export default (<Switch>
    <Route path="/app" component={
        Loadable({
            loader: () => import(/* webpackChunkName: "app" */'./routes/app'),
            loading: Loading
        })
    }/>
    <Route path="/404" component={
        Loadable({
            loader: () => import(/* webpackChunkName: "404" */'./routes/404'),
            loading: Loading
        })
    }/>

    <Redirect from="/" to="/404"/>
    {/*<Route component={NoMatch}/>*/}
</Switch>);