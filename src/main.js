/**
 *  Author: harry.lang
 *  Date: 2017/11/17
 *  Description: Created by harrylang on 2017/11/17.
 */
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Loading from './components/Loading';
import Loadable from 'react-loadable';

ReactDOM.render(
    <Router>
        <Switch>
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
        </Switch>
    </Router>,
    document.getElementById('root')
);