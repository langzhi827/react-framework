/**
 *  Author: harry.lang
 *  Date: 2018/1/18
 *  Description: Created by harrylang on 2018/1/18.
 */
import React from 'react';
import {Route, Redirect,Switch} from 'react-router-dom';

import App from './routes/app';
import NoMatch from './routes/404';

export default (<Switch>
    <Route path="/app" component={App}/>
    <Route path="/404" component={NoMatch}/>

    <Redirect from="/" to="/404"/>
    {/*<Route component={NoMatch}/>*/}
</Switch>);