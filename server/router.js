/**
 *  Author: harry.lang
 *  Date: 2018/1/23
 *  Description: Created by harrylang on 2018/1/23.
 */
import express from 'express';
import React  from 'react';
import {StaticRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import { renderToString } from 'react-dom/server';

import store from '../client/src/store';
import App from '../client/src/routes/app';

const router = express.Router();

router.get('/app', function (req, res, next) {
    res.render('index', {
        content: renderToString(
            <Provider store={store}>
                <Router context={{}} location={req.url}>
                    <App/>
                </Router>
            </Provider>
        )
    });
});

export default router;