/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import React from 'react';
import { connect } from 'react-redux';

import Title from '../components/Title';
import Table from '../components/Table';
import { updateTitle, getList } from '../actions';
import { DatePicker, Button, Dropdown, Menu, Icon } from 'antd';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';

class Component extends React.Component {

    changeTitle() {
        this.props.updateTitle('app-' + (+new Date));
    }

    componentDidMount() {
        this.props.getList();
    }

    render() {
        const { app, match } = this.props;

        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
                </Menu.Item>
            </Menu>
        );

        return <div className="app">
            <Switch>
                <Route path={`${match.url}/test`} component={
                    Loadable({
                        loader: () => import(/* webpackChunkName: "app-test" */'../routes/test'),
                        loading: () => null
                    })
                } />
            </Switch>

            <Title>{app.title}</Title>
            <DatePicker />
            <Button type="primary">Primary</Button>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    Hover me <Icon type="down" />
                </a>
            </Dropdown>

            <div className="img" onClick={this.changeTitle.bind(this)}></div>
            <Table list={app.list}></Table>
        </div>;
    }
}

function mapStateToProps(state, ownProps) {
    return state.appReducer ? { app: state.appReducer } : {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatch: dispatch,
        updateTitle: (params) => dispatch(updateTitle(params)),
        getList: () => dispatch(getList())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Component);