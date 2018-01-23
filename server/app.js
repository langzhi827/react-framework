/**
 *  Author: harry.lang
 *  Date: 2018/1/18
 *  Description: Created by harrylang on 2018/1/18.
 */
import express from 'express';
import path from 'path';

import router from './router';

const app = new express();
app.set('port', process.env.PORT || '9999');

app.use(express.static(path.join(__dirname, '../client/dist')));

app.set('views', path.join(__dirname, '../client/dist'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use('/', router);

app.listen(app.get('port'));

console.log('server run on port: ' + app.get('port'));