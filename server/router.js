/**
 *  Author: harry.lang
 *  Date: 2018/1/23
 *  Description: Created by harrylang on 2018/1/23.
 */
import express from 'express';
import React  from 'react';
import {StaticRouter as Router,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import { renderToString } from 'react-dom/server';
import 'isomorphic-fetch';

import store from '../client/src/store';
import App from '../client/src/routes/app';
import NoMatch from '../client/src/routes/404';
import { updateList } from '../client/src/routes/app/actions';

const router = express.Router();

let apiUrl = 'http://127.0.0.1:9999';
process.argv.forEach(function (val, index, array) {
    if (val.indexOf('apiUrl') > -1) {
        apiUrl = val.split('=')[1];
    }
});

function render(req, Component) {
    return renderToString(
        <Provider store={store}>
            <Router context={{}} location={req.url}>
                <Switch>
                    <Component/>
                </Switch>
            </Router>
        </Provider>
    )
}

router.get('/app', function (req, res, next) {
    fetch(apiUrl + '/mock_data/list.json').then(function (response) {
        return response.json();
    }).then(function (result) {
        store.dispatch(updateList(result));

        res.render('index', {
            content: render(req, App),
            state: JSON.stringify(store.getState())
        });
    });

});


router.get('/404', function (req, res, next) {
    res.render('index', {
        content: render(req, NoMatch),
        state: JSON.stringify(store.getState())
    });
});

export default router;