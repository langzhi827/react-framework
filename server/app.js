/**
 *  Author: harry.lang
 *  Date: 2018/1/18
 *  Description: Created by harrylang on 2018/1/18.
 */
import express from 'express';
import path from 'path';
import {StaticRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import { renderToString } from 'react-dom/server';
import React  from 'react';

import store from '../client/src/store';
import routes from '../client/src/routes';

const app = new express();
app.set('port', process.env.PORT || '9999');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use('*', function (req, res, next) {
    var url = '/404';
    res.render('index', {
        content: renderToString(
            <Router context={{}} location={url}>
                {routes}
            </Router>
        )
    });
});

app.listen(app.get('port'));

console.log('server run on port: ' + app.get('port'));